Package.describe({
  name: 'merlin:edmodo-api',
  summary: 'API service for Edmodo accounts',
  git: 'https://github.com/merlinpatt/edmodo-api',
  version: '0.0.1',
  documentation: 'README.md',
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.1');

  api.use('merlin:edmodo@1.0.5', ['client', 'server']);
  api.use('merlin:external-api@0.0.2');

  api.addFiles('edmodo-api.js');
  api.export('Edmodo');
});
