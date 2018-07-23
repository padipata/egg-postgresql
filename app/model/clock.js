'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const Clock = app.model.define('yp_clocks', {
        clock_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//打卡记录id
        user_id: INTEGER,//用户id
        shop_name: STRING(255),//店名
        shop_num: {type: INTEGER, defaultValue: 1},//打卡个数
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Clock;
};