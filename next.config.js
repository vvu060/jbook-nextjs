const removeImports = require('next-remove-imports')({
  test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  matchImports: '\\.(less|css|scss|sass|styl)$',
});

module.exports = removeImports({
  webpack(config) {
    return config;
  },
});

// module.exports = {
//   reactStrictMode: true,
//   experimental: { esmExternals: true },
// };
