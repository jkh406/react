const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@constants': path.resolve(__dirname, 'src/com/anbtech/webffice/constants'),
      '@routes': path.resolve(__dirname, 'src/com/anbtech/webffice/routes'),
      '@components': path.resolve(__dirname, 'src/com/anbtech/webffice/components'),
      '@pages': path.resolve(__dirname, 'src/com/anbtech/webffice/pages'),
      '@js': path.resolve(__dirname, 'src/com/anbtech/webffice/js'),
      '@api': path.resolve(__dirname, 'src/com/anbtech/webffice/api'),
      '@utils': path.resolve(__dirname, 'src/com/anbtech/webffice/utils'),
      '@config': path.resolve(__dirname, 'src/com/anbtech/webffice/config'),
      '@css': path.resolve(__dirname, 'src/com/anbtech/webffice/css'),
    },
  },
};