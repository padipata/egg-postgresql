'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const ShopDetailed = app.model.define('yp_shop_detaileds', {
        shop_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//店铺id
        shop_name: STRING(255),//店名
        label: STRING(255),//标签
        clock_num: {type: INTEGER, defaultValue: 0},//打卡数
        capita_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//人均价格
        longitude: STRING(32),//经度
        latitude: STRING(32),//纬度
        operating_start: DATE,//运营开始时间
        operating_end: DATE,//运营结束时间
        is_collection: {type: INTEGER, defaultValue: 0},//是否收藏 0为未收藏 1为已收藏
        shop_site: STRING(255),//地址
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return ShopDetailed;
};