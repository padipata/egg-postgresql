'use strict';

const jwt = require('jsonwebtoken');

module.exports = app => {
    class Store extends app.Service {
        /**
         * 店铺列表
         *
         * @return {Promise<*>}
         */
        async storeList() {
            let order_by = 'clock_num', order = 'DESC';
            const stores = await this.ctx.model.Shop.findAll({order: [[order_by, order.toUpperCase()]]});
            if (!stores || stores.length === 0) {
                this.ctx.throw(404, '暂无商家');
            }
            return stores;
        }

        /**
         * 获取单独店铺
         *
         * @param shop_id   店铺id
         *
         * @return {Promise<*>}
         */
        async storeOne(shop_id) {
            const stores = await this.ctx.model.Shop.findOne({
                where: {shop_id: shop_id},
            });
            if (!stores) {
                this.ctx.throw(404, '暂无该商家');
            }
            return stores
        }

        /**
         * 热门搜索
         *
         * @param sreach_num  通过搜索次数来排序
         * @param order       asc 按升序排列 - desc 按降序排列
         *
         * @return {Promise<*>}
         */
        async storeHotSearch() {
            let offset = 0, limit = 10, order_by = 'sreach_num', order = 'desc';

            const stores = await this.ctx.model.Shop.findAll({
                offset,
                limit,
                order: [[order_by, order.toUpperCase()]],
                attributes: ['shop_id', 'shop_name']
            });
            if (!stores || stores.length === 0) {
                this.ctx.throw(404, '暂无该商家');
            }
            return stores
        }

        /**
         * 搜索
         *
         * @param shop_name   店铺名称
         *
         * @return {Promise<*>}
         */
        async storeSearch(shop_name) {
            const stores = await this.ctx.model.Shop.findAll({
                where: {shop_name: {'$like': `%${shop_name}%`}},
            });
            if (!stores || stores.length === 0) {
                this.ctx.throw(404, '暂无该商家');
            }
            for (let i = 0; i < stores.length; i++) {
                stores[i].sreach_num++;
                await this.ctx.model.Shop.update(stores[i], {where: {shop_name: stores.shop_name}});
            }
            return stores
        }

        /**
         * 店铺详情
         *
         * @param shop_id  店铺id
         *
         * @return {Promise<*>}
         */
        async storeDetailed(shop_id) {
            const stores = await this.ctx.model.Shop.findOne({
                where: {shop_id: shop_id},
            });
            if (!stores) {
                this.ctx.throw(404, '暂无该商家');
            }

            let order_by = 'level', order = 'ASC';
            const coupons = await this.ctx.model.Coupon.findAll({order: [[order_by, order.toUpperCase()]]});

            let info = {};
            info.stores = stores;
            info.coupons = coupons;

            return info
        }


        /**
         * 店铺收藏or取消收藏
         *
         * @param shop_id  店铺id
         *
         * @return {Promise<void>}
         */
        async storeCollection(shop_id) {
            const token = this.ctx.header.authorization;
            const userInfo = jwt.verify(token.split('Bearer ')[1], app.config.jwtSecret);

            //查询当前店铺信息
            const stores = await this.ctx.model.Shop.findOne({
                where: {shop_id: shop_id},
            });

            let msg;

            if (stores.is_collection === 0) { //收藏
                stores.is_collection = 1;
                //查询用户收藏表，不存在则创建
                await this.ctx.model.Collection.findOrCreate({
                    where: {user_id: userInfo.user_id, shop_id: shop_id},
                    defaults: {
                        user_id: userInfo.user_id,
                        shop_id: stores.shop_id,
                        shop_name: stores.shop_name,
                        label: stores.label,
                        clock_num: stores.clock_num,
                        capita_price: stores.capita_price,
                        shop_site: stores.shop_site
                    }
                })
                    .spread((collection, created) => {
                    });
                msg = '收藏成功'
            } else { //取消收藏
                stores.is_collection = 0;
                await this.ctx.model.Collection.destroy({
                    where: {user_id: userInfo.user_id, shop_id: shop_id},
                })
                msg = '取消收藏成功'
            }

            //更新店铺收藏信息
            await this.ctx.model.Shop.update(stores.dataValues, {where: {shop_id: shop_id}});

            return msg

        }

        /**
         * 我的收藏
         */
        async collectionlist() {
            let order_by = 'updated_at', order = 'DESC';
            const collections = await this.ctx.model.Collection.findAll({order: [[order_by, order.toUpperCase()]]});
            if (!collections || collections.length === 0) {
                this.ctx.throw(404, '暂无收藏');
            }
            return collections;
        }
    }

    return Store;
};