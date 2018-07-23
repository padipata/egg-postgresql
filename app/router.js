'use strict';

module.exports = app => {
    const {router} = app;

    //校验用户token中间件 {auth.isLogin}
    const auth = app.middlewares.auth();

    router.get('/api/v2/user/login/:code', 'api.user.login');//小程序授权
    router.get('/api/v2/user/userInfo/:id', auth.isLogin, 'api.user.user');//用户信息
    router.post('/api/v2/user/userList', 'api.user.users');//用户列表
};
