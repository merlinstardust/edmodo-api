Edmodo.baseUrl = 'https://api.edmodo.com/';

const scopes = {
  basic: 'basic',
  readGroups: 'read_groups',
  readConnections: 'read_connections',
  readUserEmail: 'read_user_email',
  createMessages: 'create_messages',
  writeLibraryItems: 'write_library_items',
};

const edmodoCall = (endpoint, {method, data} = {}) => {
  const url = Edmodo.baseUrl + endpoint;

  const edmodoToken = Meteor.user().services.edmodo.accessToken;
  const httpOptions = {
    headers: {Authorization: `Bearer ${edmodoToken}`},
  };

  if (data) {
    httpOptions.data = data;
  }

  return ExternalApi.callSync({httpOptions, method, url});
};

/*
 * params = {
 *   redirectUri: String,
 *   refreshToken: String,
 * }
 */
Edmodo.refreshToken = ({redirectUri, refreshToken}) => (
  edmodoCall('oauth/token', {
    method: 'POST',
    data: {
      grant_type: 'refresh_token',
      client_id: Meteor.settings.Edmodo.clientId,
      client_secret: Meteor.settings.Edmodo.clientSecret,
      redirect_uri: redirectUri,
      refresh_token: refreshToken,
    },
  })
);

/*
 * scope: basic read_user_email
 */
Edmodo.getUser = (id = 'me') => edmodoCall(`users/${id}`);

/*
 * scope: read_groups
 */
Edmodo.getGroups = (groupId = '')  => edmodoCall(`groups/${groupId}`);

/*
 * scope: read_groups
 * params = {
 *   id: String,
 *     OR
 *   groupId: String,
 *   userId: String,
 *   page: String,
 *   perPage: String,
 * }
 */
Edmodo.getGroupMemberships = (paramsOrId = '') => {
  const endpoint = 'group_memberships';

  if (paramsOrId.constructor === String) {
    const id = paramsOrId;
    return edmodoCall(`${endpoint}/${id}`);
  }

  const {userId, groupId, page, perPage} = paramsOrId;
  const data = {page};
  if (userId) {
    data.user_id = userId;
  }
  if (groupId) {
    data.group_id = groupId;
  }
  if (perPage) {
    data.per_page = perPage;
  }

  return edmodoCall(endpoint, {data});
};

/*
 * scope: read_connections
 * params = {
 *   id: String,
 *     OR
 *   userId: String,
 *   status: String (active, pending, blocked),
 *   page: String,
 *   perPage: String,
 * }
 */
Edmodo.getConnections = (paramsOrId = '') => {
  const endpoint = 'connections';

  if (paramsOrId.constructor === String) {
    const id = paramsOrId;
    return edmodoCall(`${endpoint}/${id}`);
  }

  const {userId, status, page, perPage} = paramsOrId;
  const data = {status, page};
  if (userId) {
    data.user_id = userId;
  }
  if (perPage) {
    data.per_page = perPage;
  }

  return edmodoCall(endpoint, {data});
};

/*
 * scope: create_messages
 * params = {
 *   text: String,
 *   attachments: Object,
 *   recipients: Object,
 *   postAt: Date,
 *   moderated: Boolean,
 * }
 */
Edmodo.postMessages = ({text, attachments, recipents, postAt, moderated}) => {
  const data = {
    content_type: 'note',
    content: {text, attachments},
    recipients,
    moderated,
  };

  if (postAt) {
    data.post_at = postAt;
  }

  return edmodoCall('messages/', {method: 'POST', data});
};

/*
 * scope: write_library_items
 * params = {
 *   type: String (folder, file, link, embed),
 *   item: {
 *     title: String,
 *     linkUrl: String, (only type folder)
 *     content: String, (only type content)
 *   },
 * }
 */
Edmodo.postLibraryItems = ({type, item: {title, linkUrl, content}}) => {
  const data = {item: {title}, type};

  if (content) {
    data.item.content = content;
  }
  if (linkUrl) {
    data.item.link_url = linkUrl;
  }

  return edmodoCall('library_items/', {method: 'POST', data});
};

if (Meteor.isClient) {
  Edmodo.logout = (returnUrl) => {
    window.location = Edmodo.baseUrl + 'logout?return_to=' + returnUrl;
  };
}
