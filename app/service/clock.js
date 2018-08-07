'use strict';

module.exports = app => {
    class Clock extends app.Service {
        /**
         * 打卡
         *
         * @param shop_id   店铺id
         * @param user_id   用户id
         *
         * @return {Promise<*>}
         */
        async clockUp(shop_id, user_id, shop_name) {
            await this.ctx.model.Clock.findOrCreate({
                where: {shop_id: shop_id, user_id: user_id},
                defaults: {shop_id: shop_id, user_id: user_id, shop_name: shop_name}
            })
                .spread((clock, created) => {
                })
        }

        /**
         * 获取用户打卡记录
         *
         * @param user_id   用户id
         * @param order_by  按时间排序
         * @param order     ASC 按升序排列 - DESC 按降序排列
         *
         * @return {Promise<*>}
         */
        async clockList(user_id) {
            let order_by = 'created_at', order = 'DESC';
            const clock = await this.ctx.model.Clock.findAll(
                {
                    where: {user_id: user_id},
                    order: [[order_by, order.toUpperCase()]]
                }
            );
            if (!clock || clock.length === 0) {
                this.ctx.throw(404, '暂无打卡记录');
            }
            return clock;
        }

    }

    return Clock;
};