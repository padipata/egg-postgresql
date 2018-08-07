'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const Coupon = app.model.define('yp_coupons', {
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

    return Coupon;
};