'use strict';

const co = require('co');

module.exports = {
    up: co.wrap(function* (db, Sequelize) {
        const {INTEGER, DATE, STRING, DECIMAL, TEXT} = Sequelize;

        //------------------------------------------------------------------
        //  前端
        //------------------------------------------------------------------

        // 用户表
        yield db.createTable('yp_users', {
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

        // 收藏表
        yield db.createTable('yp_collections', {
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

        // 打卡记录表
        yield db.createTable('yp_clocks', {
            clock_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//打卡记录id
            user_id: INTEGER,//用户id
            shop_id: INTEGER,//店铺id
            shop_name: STRING(255),//店名
            shop_num: {type: INTEGER, defaultValue: 1},//打卡个数
            created_at: DATE,//创建时间
            updated_at: DATE,//更新时间
        });

        // 店铺表
        yield db.createTable('yp_shops', {
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

        // 优惠券表
        yield db.createTable('yp_coupons', {
            coupon_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//优惠券id
            coupon_name: STRING(255),//优惠券名字
            coupon_img: STRING(255),//优惠券图片
            level: INTEGER,//等级 0是初级，1是中级，2是高级，3是会员
            coupon_type: INTEGER,//优惠券类型 0为减免 1为折扣
            coupon_price: {type: DECIMAL(10, 2), defaultValue: 0.00},//优惠券价格
            window: {type: INTEGER, defaultValue: 1},//默认1是弹窗，点击关闭后改为0
            coupon_discount: {type: INTEGER, defaultValue: 10},//折扣，1~10
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


        //------------------------------------------------------------------
        //  后台管理系统
        //------------------------------------------------------------------

        // 管理员表
        yield db.createTable('yp_admin_users', {
            user_id: {type: INTEGER, primaryKey: true, autoIncrement: true},//管理员id
            user_name: STRING(255),//管理员账号
            password: STRING(255),//密码
            level: INTEGER,//管理员等级，0是超级管理员，1是普通管理员
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

        yield db.dropTable('yp_admin_users');//管理员表
    }),
};