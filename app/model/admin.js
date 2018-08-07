'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const Admin = app.model.define('yp_admin_users', {
        user_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//管理员id
        user_name: STRING(255),//管理员账号
        password: STRING(255),//密码
        level: INTEGER,//管理员等级，0是超级管理员，1是普通管理员
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Admin;
};