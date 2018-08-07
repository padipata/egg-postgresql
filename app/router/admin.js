/*            _
       __  __(_)___  ____ _____ ____
      / / / / / __ \/ __ `/ __ `/ _ \
     / /_/ / / /_/ / /_/ / /_/ /  __/
     \__, /_/ .___/\__,_/\__, /\___/
    /____/ /_/          /____/

*/

'use strict';

module.exports = app => {
    const apiV1Router = app.router.namespace('/api/v1');
    const {controller, middleware} = app;
    const {user, store} = controller.admin;
    const auth = middleware.auth();//校验用户token中间件

    apiV1Router.post('/admin/login', user.login);//管理员登录
    apiV1Router.post('/admin/storeList', store.adminStoreList);//商家列表
    apiV1Router.post('/admin/addStore', auth, store.addStore);//新增商家
    apiV1Router.delete('/admin/delStore/:shop_id', auth, store.delStore);//删除商家
    apiV1Router.put('/admin/editorStore', auth, store.editorStore);//编辑商家

    apiV1Router.post('/admin/userList', user.adminUserList);//用户列表
};