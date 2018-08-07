'use strict';

const qiniu = require('qiniu');

const Controller = require('egg').Controller;

class QiniuController extends Controller {
    // 获取七牛云信息
    async getToken() {
        const {app, ctx} = this;
        const accessKey = app.config.accessKey;
        const secretKey = app.config.secretKey;
        const bucket = app.config.bucket_name;
        const bucket_domain = app.config.bucket_domain;
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const putPolicy = new qiniu.rs.PutPolicy({
            scope: bucket
        });
        const uploadToken = putPolicy.uploadToken(mac);
        ctx.body = {"bucket_domain": bucket_domain, "uploadToken": uploadToken};
    }

}

module.exports = QiniuController;
