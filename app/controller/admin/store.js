'use strict';

const Controller = require('egg').Controller;

class StoreController extends Controller {
    /**
     * 商家列表
     * offset   第几页
     * limit    一页多少条记录
     */
    async adminStoreList() {
        let info = {};

        if (this.ctx.request.body.shop_name) {
            info.shop_name = this.ctx.request.body.shop_name
        }
        if (this.ctx.request.body.shop_area) {
            info.shop_area = this.ctx.request.body.shop_area
        }

        if (!this.ctx.request.body.offset) {
            info.offset = 0
        } else {
            info.offset = this.ctx.request.body.offset
        }

        if (!this.ctx.request.body.limit) {
            info.limit = 10
        } else {
            info.limit = this.ctx.request.body.limit
        }

        this.ctx.body = await this.ctx.service.adminStore.adminStoreList(info);
    }

    // 添加商铺
    async addStore() {
        if (!this.ctx.request.body.shop_name) {
            this.ctx.throw(404, '请输入商家名称');
        } else if (!this.ctx.request.body.shop_img) {
            this.ctx.throw(404, '请上传封面图片');
        } else if (!this.ctx.request.body.shop_banner) {
            this.ctx.throw(404, '请上传轮播展示图片');
        } else if (!this.ctx.request.body.shop_area) {
            this.ctx.throw(404, '请选择所在地区');
        } else if (!this.ctx.request.body.shop_site) {
            this.ctx.throw(404, '请输入详细地址');
        } else if (!this.ctx.request.body.operating_start || !this.ctx.request.body.operating_end) {
            this.ctx.throw(404, '请选择营业时间');
        }

        await this.ctx.service.adminStore.addStore(this.ctx.request.body);

        this.ctx.status = 200;
        this.ctx.body = {'msg': '添加成功'}
    }

    // 删除店铺
    async delStore() {
        await this.ctx.service.adminStore.delStore(this.ctx.params.shop_id);
        this.ctx.body = {'msg': '删除成功'}
    }

    // 编辑商品
    async editorStore() {
        if (!this.ctx.request.body.shop_name) {
            this.ctx.throw(404, '商家名称不能为空');
        } else if (!this.ctx.request.body.shop_img) {
            this.ctx.throw(404, '封面图片不能为空');
        } else if (!this.ctx.request.body.shop_banner) {
            this.ctx.throw(404, '轮播展示图片不能为空');
        } else if (!this.ctx.request.body.shop_area) {
            this.ctx.throw(404, '所在地区不能为空');
        } else if (!this.ctx.request.body.shop_site) {
            this.ctx.throw(404, '详细地址不能为空');
        } else if (!this.ctx.request.body.operating_start || !this.ctx.request.body.operating_end) {
            this.ctx.throw(404, '营业时间不能为空');
        }

        await this.ctx.service.adminStore.editorStore(this.ctx.request.body);

        this.ctx.status = 200;
        this.ctx.body = {'msg': '修改成功'}
    }
}

module.exports = StoreController;