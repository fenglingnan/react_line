const proxy=require('http-proxy-middleware');

module.exports=function(app){
    app.use(
        // 图灵测试
        '/test',
        proxy.createProxyMiddleware({
            target:'http://www.tuling123.com/',
            changeOrigin:true,
            pathRewrite:{
                '^/test':''
            }
        })
    )
}