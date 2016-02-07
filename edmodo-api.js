Edmodo.baseUrl = 'https://api.edmodo.com/';

var scopes = {
  basic: 'basic',
  readGroups: 'read_groups',
  readConnections: 'read_connections',
  readUserEmail: 'read_user_email',
  createMessages: 'create_messages',
  writeLibraryItems: 'write_library_items',
};

var edmodoCall = function edmodoCall(endpoint) {
  var endpointUrl = Edmodo.baseUrl + endpoint;

  var edmodoToken = Meteor.user().services.edmodo.accessToken;
  var httpOptions = {
    headers: {Authorization: 'Bearer ' + edmodoToken},
  };

  var response = ExternalApi.callSync({
    url: endpointUrl,
    httpOptions: httpOptions,
    errorProperties: {code: 'status_code', message: 'error'},
  });

  return response;
};

var getQuery = function getQuery(params) {
  var query = [];
  for(var key in params) {
    if (params.hasOwnProperty(key)) {
      query.push(key + "=" + params[key]);
    }
  }
  return '?' + query.join("&");
};

/*
 * grant_type: (refresh_token)
 */
Edmodo.refreshToken = function refreshToken() {
  // TODO with client_id, with client_secret, with redirect_url, with refresh_token
  var endpoint = 'oauth/token';
};

/*
 * scope: basic read_user_email
 */
Edmodo.getUser = function getUser(id) {
  id = id || 'me';
  var endpoint = 'users/' + id;
  var user = edmodoCall(endpoint);

  return user;
};

/*
 * scope: read_groups 
 */
Edmodo.getGroups = function getGroups(groupId) {
  groupId = groupId || '';
  var endpoint = 'groups/' + groupId;
  var groups = edmodoCall(endpoint);

  return groups;
};

/*
 * scope: read_groups 
 * params = {
 *   id: String,
 *     OR
 *   group_id: String,
 *   user_id: String,
 *   page: String,
 *   per_page: String,
 * }
 */
Edmodo.getGroupMemberships = function getGroupMemberships(params) {
  // scope read_groups
  var id = params.id;

  var query = '/' + id;
  if (! id) {
    query = getQuery(params);
  }

  var endpoint = 'group_memberships' + query;
  var groupMemberships = edmodoCall(endpoint);

  return groupMemberships;
};

/* 
 * scope: read_connections
 * params = {
 *   id: String,
 *     OR
 *   user_id: String,
 *   status: String (active, pending, blocked),
 *   page: String,
 *   per_page: String,
 * }
 */
Edmodo.getConnections = function getConnections(params) {
  var id = params.id;

  var query = '/' + id;
  if (! id) {
    query = getQuery(params);
  }

  var endpoint = 'connections' + query;
  var connections = edmodoCall(endpoint);

  return connections;
};

/*
 * scope: create_messages
 */
Edmodo.postMessages = function postMessages() {
  // TODO req content_type (note), req content (req text, opt attachments), req recipients
  // opt post_at, opt moderated
  var endpoint = 'messages/';
};

/*
 * scope: write_library_items
 */
Edmodo.postLibraryItems = function postLibraryItems() {
  // TODO req type (folder, file, link embed)
  // req item (title [folder, link, embed], link_url, content [embed])
  var endpoint = 'library_items/';
};

if (Meteor.isClient) {
  Edmodo.logout = function logout(returnUrl) {
    var endpoint = Edmodo.baseUrl + 'logout?return_to=' + returnUrl;
    window.location = endpoint;
  };
}
