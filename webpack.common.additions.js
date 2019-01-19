const path = require('path');

module.exports = {
  resolve: {
    alias: {
      static: path.resolve(__dirname, 'static'),

      '@utils': path.resolve(__dirname, 'src/common/utils'),
      '@components': path.resolve(__dirname, 'src/renderer/components'),
      '@containers': path.resolve(__dirname, 'src/renderer/containers'),

      // stores [TODO: automate]
      '@lcu': path.resolve(__dirname, 'src/renderer/store/lcu'),
      '@groups': path.resolve(__dirname, 'src/renderer/store/groups'),
      '@bindings': path.resolve(__dirname, 'src/renderer/store/bindings'),
    },
  },
};
