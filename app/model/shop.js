'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const Shop = app.model.define('yp_shops', {
        shop_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//店铺id
        shop_name: STRING(255),//店名
        label: STRING(255),//标签
        clock_num: {type: INTEGER, defaultValue: 0},//打卡数
        capita_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//人均价格
        longitude: STRING(32),//经度
        latitude: STRING(32),//纬度
        shop_area: STRING(16),//地区
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Shop;
};