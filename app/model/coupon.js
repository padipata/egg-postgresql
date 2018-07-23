'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, DECIMAL} = app.Sequelize;

    const Coupon = app.model.define('yp_coupons', {
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

    return Coupon;
};