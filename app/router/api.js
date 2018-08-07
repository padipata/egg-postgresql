/*            _
       __  __(_)___  ____ _____ ____
      / / / / / __ \/ __ `/ __ `/ _ \
     / /_/ / / /_/ / /_/ / /_/ /  __/
     \__, /_/ .___/\__,_/\__, /\___/
    /____/ /_/          /____/

*/
'use strict';

module.exports = app => {
    const apiV2Router = app.router.namespace('/api/v2');
    const {controller, middleware} = app;
    const {user, store, clock, qiniu} = controller.api;
    const auth = middleware.auth();//校验用户token中间件

    apiV2Router.get('/qiniu', qiniu.getToken);//七牛云信息

    apiV2Router.get('/user/login/:code', user.login);//小程序授权
    apiV2Router.get('/user/userInfo', auth, user.userInfo);//用户信息
    apiV2Router.put('/user/setUserInfo', auth, user.setUserInfo);//设置用户信息

    apiV2Router.get('/store/list', store.storeList);//店铺列表
    apiV2Router.get('/store/one/:shop_id', store.storeOne);//获取单独店铺
    apiV2Router.get('/store/search/:shop_name', store.storeSearch);//搜索
    apiV2Router.get('/store/hotSearch', store.storeHotSearch);//热门搜索
    apiV2Router.get('/store/detailed/:shop_id', store.storeDetailed);//店铺详情
    apiV2Router.put('/store/collection/:shop_id', store.storeCollection);//店铺收藏or取消收藏
    apiV2Router.get('/store/collectionlist', store.collectionlist);//我的收藏店铺

    apiV2Router.post('/clock/up', auth, clock.clockUp);//打卡
    apiV2Router.get('/clock/List', auth, clock.clockList);//获取用户打卡记录

};
