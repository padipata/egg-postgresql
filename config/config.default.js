'use strict';

module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_padipata';

    // 部署环境
    config.domain = 'http://127.0.0.1:7001';

    // 微信相关
    config.appId = 'wx8bc5d288383a85c9';
    config.appSecret = '121dd6705a31acf18eb489ae9b8380aa';

    // token凭证
    config.jwtSecret = 'padipata';

    // 使用koa的中间件
    config.middleware = ['errorHandler'];

    config.auth = {
        test: 'tst',
    };

    // PostgresSQL
    config.sequelize = {
        dialect: 'postgres',//db类型
        database: 'postgres',//数据库名
        host: 'localhost',//主机
        port: '5432',//端口
        username: 'root',
        password: 'xiaoh0.0',
    };

    //异常捕获路由
    config.errorHandler = {
        match: '/api/v2',
    };

    // 关闭安全威胁csrf的防范
    config.security = {
        csrf: {
            enable: false,
        },
    };

    // 解决跨域
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    return config;
};
