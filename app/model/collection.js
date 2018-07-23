'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const Collection = app.model.define('yp_collections', {
        shop_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//店铺id
        user_id: {type: INTEGER},//用户id
        shop_name: {type: STRING(255)},//店名
        label: {type: STRING(255)},//标签
        clock_num: {type: INTEGER, defaultValue: 0},//打卡数
        capita_price: {type: DECIMAL(10, 2)},//人均价格
        longitude: {type: STRING(32)},//经度
        latitude: {type: STRING(32)},//纬度
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Collection;
};