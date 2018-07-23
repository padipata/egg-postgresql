'use strict';

const co = require('co');

module.exports = {
    up: co.wrap(function* (db, Sequelize) {
        const {INTEGER, DATE, STRING, DECIMAL} = Sequelize;
        // 用户表
        yield db.createTable('yp_users', {
            user_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//用户id
            open_id: STRING(255),//微信open_id
            nick_name: STRING(30),//姓名
            avatar_url: STRING(256),//头像
            gender: {type: INTEGER, defaultValue: 0}, //值为1时是男性，值为2时是女性，值为0时是未知
            vip: {type: INTEGER, defaultValue: 0}, //值为0时是初级吃货，值为1时是中级吃货，值为2时是高级吃货
            //我的足迹
            area: {type: INTEGER, defaultValue: 0},//跨越区数
            restaurant: {type: INTEGER, defaultValue: 0},//吃了餐厅个数
            beyond: {type: STRING(10), defaultValue: '0%'},//超越用户数 0~100%
            eat: {type: STRING(255), defaultValue: ''},//吃过菜品类型
            shop: {type: STRING(255), defaultValue: ''},//吃过的店
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });

        // 收藏表
        yield db.createTable('yp_collections', {
            shop_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//店铺id
            user_id: INTEGER,//用户id
            shop_name: STRING(255),//店名
            label: STRING(255),//标签
            clock_num: {type: INTEGER, defaultValue: 0},//打卡数
            capita_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//人均价格
            longitude: STRING(32),//经度
            latitude: STRING(32),//纬度
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });

        // 打卡记录表
        yield db.createTable('yp_clocks', {
            clock_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//打卡记录id
            user_id: INTEGER,//用户id
            shop_name: STRING(255),//店名
            shop_num: {type: INTEGER, defaultValue: 1},//打卡个数
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });

        // 店铺表
        yield db.createTable('yp_shops', {
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

        // 店铺详情表
        yield db.createTable('yp_shop_detaileds', {
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

        // 优惠券表
        yield db.createTable('yp_coupons', {
            coupon_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//优惠券id
            user_id: INTEGER,//用户id
            coupon_name: STRING(255),//优惠券名字
            coupon_img: STRING(255),//优惠券图片
            coupon_type: INTEGER,//优惠券类型 0为减免 1为折扣
            coupon_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//优惠券价格
            coupon_discount: INTEGER,//折扣 范围：1~10
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });

        // 文章表
        yield db.createTable('yp_articles', {
            article_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//文章id
            shop_id: INTEGER,//店铺id
            article_img: STRING(255),//文章封面
            article_title: STRING(255),//文章标题
            article_url: STRING(255),//跳转链接
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });
    }),

    down: co.wrap(function* (db) {
        yield db.dropTable('yp_users');//用户表
        yield db.dropTable('yp_collections');//收藏表
        yield db.dropTable('yp_clocks');//打卡记录表
        yield db.dropTable('yp_shops');//店铺表
        yield db.dropTable('yp_shop_detaileds');//店铺详情表
        yield db.dropTable('yp_coupons');//优惠券表
        yield db.dropTable('yp_articles');//文章表
    }),
};