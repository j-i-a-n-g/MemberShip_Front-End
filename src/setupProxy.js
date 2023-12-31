const { createProxyMiddleware } = require('http-proxy-middleware')

// 配置代理
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:9981/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    })
  )
}