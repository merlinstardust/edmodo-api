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

Edmodo.refreshToken = function refreshToken() {
  // TODO with client_id, with client_secret, with redirect_url, with refresh_token
  // with grant_type (refresh_token)
  var endpoint = 'oauth/token';
};

// TODO pagination with page, with per_page
// on groups, groupMemberships, on conections
// Link: <https://api.edmodo.com/groups?page=1&per_page=2>; rel="previous", <https://api.edmodo.com/groups?page=3&per_page=2>; rel="next"
// X-Total-Count: 104

Edmodo.getUser = function getUser() {
  // scope basic read_user_email
  // TODO by id, by me, by email
  var endpoint = 'users/';
};

Edmodo.getGroups = function getGroups(groupId) {
  // scope read_groups
  groupId = groupId || '';
  var endpoint = 'groups/' + groupId;
  var groups = edmodoCall(endpoint);

  return groups;
};

Edmodo.getGroupMemberships = function getGroupMemberships() {
  // TODO by id, by user_id, by group_id
  // scope read_groups
  var endpoint = 'group_memberships/';
};

Edmodo.getConnections = function getConnections() {
  // TODO by id, by user_id, by status
  // scope read_connections
  var endpoint = 'connections/';
};
//
Edmodo.postMessages = function postMessages() {
  // TODO req content_type (note), req content (req text, opt attachments), req recipients
  // opt post_at, opt moderated
  // scope create_messages
  var endpoint = 'messages/';
};

Edmodo.postLibraryItems = function postLibraryItems() {
  // TODO req type (folder, file, link embed)
  // req item (title [folder, link, embed], link_url, content [embed])
  // scope write_library_items
  var endpoint = 'library_items/';
};

if (Meteor.isClient) {
  Edmodo.logout = function logout(returnUrl) {
    var endpoint = Edmodo.baseUrl + 'logout?return_to=' + returnUrl;
    window.location = endpoint;
  };
}
