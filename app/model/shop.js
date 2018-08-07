'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL, TEXT} = app.Sequelize;

    const Shop = app.model.define('yp_shops', {
        shop_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//店铺id
        shop_name: STRING(255),//店名
        shop_banner: TEXT,//轮播图展示
        label: STRING(255),//标签
        shop_img: STRING(255),//店铺图片
        clock_num: {type: INTEGER, defaultValue: 0},//打卡数
        capita_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//人均价格
        window: {type: INTEGER, defaultValue: 1},//默认1是弹窗，点击关闭后改为0
        shop_area: STRING(16),//地区
        sreach_num: {type: INTEGER, defaultValue: 0},//搜索次数
        shop_site: STRING(255),//详细地址
        is_collection: {type: INTEGER, defaultValue: 0},//是否收藏 0为未收藏 1为已收藏
        operating_start: STRING(64),//运营开始时间
        operating_end: STRING(64),//运营结束时间
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Shop;
};