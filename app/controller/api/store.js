'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
    // 店铺列表
    async storeList() {
        this.ctx.body = await this.ctx.service.store.storeList();
    }

    // 获取单独店铺
    async storeOne() {
        this.ctx.body = await this.ctx.service.store.storeOne(this.ctx.params.shop_id);
    }

    // 热门搜索
    async storeHotSearch() {
        this.ctx.body = await this.ctx.service.store.storeHotSearch();
    }

    // 搜索
    async storeSearch() {
        if (!this.ctx.params.shop_name) {
            this.ctx.throw(404, '请输入关键字');
        }
        this.ctx.body = await this.ctx.service.store.storeSearch(this.ctx.params.shop_name);
    }

    // 商品详情
    async storeDetailed() {
        this.ctx.body = await this.ctx.service.store.storeDetailed(this.ctx.params.shop_id);
    }

    // 商品收藏
    async storeCollection() {
        const msg = await this.ctx.service.store.storeCollection(this.ctx.params.shop_id);
        this.ctx.status = 200;
        this.ctx.body = {"msg": msg}
    }

    // 我的收藏
    async collectionlist() {
        this.ctx.body = await this.ctx.service.store.collectionlist();
    }
}

module.exports = StoreController;