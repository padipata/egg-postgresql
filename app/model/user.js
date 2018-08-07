'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const User = app.model.define('yp_users', {
        user_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//用户id
        open_id: STRING(255),//微信open_id
        nick_name: {type: STRING(32), allowNull: false},//姓名
        headimg_url: STRING(256),//头像

        vip: {type: INTEGER, defaultValue: 0}, //值为0时是初级吃货，值为1时是中级吃货，值为2时是高级吃货
        window: {type: INTEGER, defaultValue: 1},//默认1是弹窗，点击关闭后改为0
        //我的足迹
        area: {type: INTEGER, defaultValue: 0},//跨越区数
        restaurant: {type: INTEGER, defaultValue: 0},//吃了餐厅个数
        beyond: {type: STRING(10), defaultValue: '0%'},//超越用户数 0~100%
        eat: {type: STRING(255), defaultValue: ''},//吃过菜品类型
        shop: {type: STRING(255), defaultValue: ''},//吃过的店
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return User;
};