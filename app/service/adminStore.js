'use strict';

module.exports = app => {
    class AdminStore extends app.Service {
        /**
         * 商家查询
         *
         * @param shop_name   店铺名称
         * @param shop_area   地区
         *
         * @return {Promise<*>}
         */
        async adminStoreList(store) {
            let offset = 0
            if (store.offset > 0) {
                offset = (store.offset - 1) * store.limit;
            }
            const limit = store.limit;

            const order_by = 'created_at';
            const order = 'DESC';

            const stores = await this.ctx.model.Shop.findAndCountAll({
                where: {
                    shop_name: {'$like': `%${store.shop_name ? store.shop_name : ''}%`},
                    shop_area: {'$like': `%${store.shop_area ? store.shop_area : ''}%`}
                },
                offset,
                limit,
                order: [[order_by, order.toUpperCase()]],
            });

            if (!stores || stores.length === 0) {
                this.ctx.throw(404, '暂无店铺信息');
            }

            return stores;
        }

        /**
         * 新增商家
         *
         * @param shops     商家信息
         *
         * @return {Promise<void>}
         */
        async addStore(shops) {
            await this.ctx.model.Shop.findOrCreate({
                where: {shop_name: shops.shop_name},
                defaults: shops
            })
                .spread((shop, created) => {
                });
        }

        /**
         * 删除商家
         *
         * @param shop_id   商家id
         *
         * @return {Promise<void>}
         */
        async delStore(shop_id) {
            const shop = await this.ctx.model.Shop.findOne({where: {shop_id: shop_id}});
            if (!shop) {
                this.ctx.throw(404, '没有该商家');
            }
            return shop.destroy();
        }

        /**
         * 编辑店铺
         *
         * @param shops     商家信息
         *
         * @return {Promise<void>}
         */
        async editorStore(shops) {
            //更新店铺信息
            return await this.ctx.model.Shop.update(shops, {where: {shop_id: shops.shop_id}});
        }

    }

    return AdminStore;
};