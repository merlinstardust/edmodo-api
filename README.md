# Edmodo API

This package uses the [External API package](https://atmospherejs.com/merlin/external-api) to get results from [Edmodo's Connect API](https://developers.edmodo.com/edmodo-connect/docs/). You should use it in conjunction with the [Edmodo Accounts package](https://atmospherejs.com/merlin/accounts-edmodo)

## Table of Contents
  * Functions
    * `refreshToken({redirectUri, refreshToken})`
    * `getUser(id = 'me')`
    * `getGroups(groupId = '')`
    * `getGroupMemberships(paramsOrId = '')`
      * `params = {userId, groupId, page, perPage}`
    * `getConnections(paramsOrId = '')`
      * `params = {userId, status, page, perPage}`
    * `postMessages({text, attachments, recipents, postAt, moderated})`
    * `postLibraryItems({type, item})`
    * `logout(returnUrl)`

## Functions

### `refreshToken({redirectUri, refreshToken})`

### `getUser(id = 'me')`

### `getGroups(groupId = '')`

### `getGroupMemberships(paramsOrId = '')`

  `params = {userId, groupId, page, perPage}`

### `getConnections(paramsOrId = '')`

  `params = {userId, status, page, perPage}`

### `postMessages({text, attachments, recipents, postAt, moderated})`

### `postLibraryItems({type, item})`

### `logout(returnUrl)`
