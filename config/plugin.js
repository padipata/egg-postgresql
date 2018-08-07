'use strict';

//参数校验
exports.validate = {
    enable: true,
    package: 'egg-validate',
};

//处理跨域
exports.cors = {
    enable: true,
    package: 'egg-cors',
};

//db
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};

//路由划分
exports.routerPlus = {
    enable: true,
    package: 'egg-router-plus',
};

//阿里云监控
exports.alinode = {
    enable: true,
    package: 'egg-alinode',
};

