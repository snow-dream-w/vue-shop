# vue-shop

# 跨域问题以及cookie传递
# 前端
跨域默认不让操作cookie的，补充上这个属性
axios.interceptors.request.use((config) => {
    config.withCredentials = true
    return config
}, (error) => {
    return Promise.reject(error)
})
# 后端
app.use(cors({
        // 跨域的域名，可以设置为*也可以设置为具体的域，其中，*表示全部
        // origin: '*',
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        // 预检请求的有效期，单位为秒
        maxAge: 5,
        // 为服务端标识浏览器请求CORS时是否可以附带身份凭证，对于附带身份凭证的请求，
        // 服务器不得设置 Access-Control-Allow-Origin 的值为“*”
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }))