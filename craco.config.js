const path = require(`path`);

const prefix = './src';

const aliases = {
  '@components': `${prefix}/components`,
  '@contexts': `${prefix}/contexts`,
  '@forms': `${prefix}/components/forms`,
  '@fragments': `${prefix}/fragments`,
  '@helpers': `${prefix}/helpers`,
  '@hooks': `${prefix}/hooks`,
  '@pages': `${prefix}/components/pages`,
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ]),
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
  },
};
