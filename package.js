Package.describe({
  name: 'merlin:edmodo-api',
  summary: 'API service for Edmodo accounts',
  git: 'https://github.com/merlinpatt/edmodo-api',
  version: '1.0.0',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.2.2');
  api.use('ecmascript');

  api.use('merlin:edmodo@2.0.0', ['client', 'server']);
  api.use('merlin:external-api@0.0.3');

  api.addFiles('edmodo-api.js');
  api.export('Edmodo');
});
