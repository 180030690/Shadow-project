module.exports = function getEntriesConfig(isProd) {
  const entries = {};
  // add hbs-components only for local development
  const hbsEntries = isProd ? ['./src/hbs-app/hbs-bundles/js-components.js']  : ['./src/hbs-app/hbs-bundles/hbs-components.js', './src/hbs-app/hbs-bundles/js-components.js'];

  entries.app = [
    ...hbsEntries,
    './src/stylesheets/app.scss'
  ];

  return entries;
};
