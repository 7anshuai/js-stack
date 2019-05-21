const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: [
    require('postcss-import'),
    postcssPresetEnv({
      browsers: ['last 2 versions', '> 5%'],
      stage: 0
    }),
    require('cssnano')
  ]
};
