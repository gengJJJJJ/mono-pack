module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 192,
      propList: ['*'],
      selectorBlackList: ['.hairline'], // 或使用正则 /^body$/
      minPixelValue: 2, // 小于 2px 的不转换
    },
  },
};
