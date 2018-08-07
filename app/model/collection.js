'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const Collection = app.model.define('yp_collections', {
        user_id: {type: INTEGER, primaryKey: true,},//用户id
        shop_id: INTEGER,//店铺id
        shop_name: STRING(255),//店名
        label: STRING(255),//标签
        clock_num: {type: INTEGER, defaultValue: 0},//打卡数
        capita_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//人均价格
        shop_site: STRING(255),//详细地址
        created_at: DATE,//创建时间
        updated_at: DATE,//更新时间
    });

    return Collection;
};