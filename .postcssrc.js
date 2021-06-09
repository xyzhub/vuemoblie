// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // 如果是vant就按照37.5 如果是自己写的就遵循75
        return file.indexOf('vant') !== -1 ? 37.5 : 75
        // 如果自己开发项目,这里写75,好处就是直接写设计图的尺寸
      },
      propList: ['*']
    }
  }
}
