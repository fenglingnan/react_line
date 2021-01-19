const proxy=require('http-proxy-middleware');

module.exports=function(app){
    app.use(
        // 图灵测试
        '/test',
        proxy.createProxyMiddleware({
            target:'http://www.tuling123.com/api',
            changeOrigin:true,
            pathRewrite:{
                '^/test':'/'
            }
        })
    )
    app.use(
        //本地环境测试
        '/api',
        proxy.createProxyMiddleware({
            target:'http://127.0.0.1:8000/api',
            changeOrigin:true,
            pathRewrite:{
                '^/api':'/'
            }
        })
    )
}