import Request from './http'
let request = new Request().http

export default {
    wxLogin: (data) => {
        return request({
            url: '/wechat/user/login',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    }
}

// export default {
//     // 小程序登录
// 	wxLogin: (data) => request.post(prefix + '/wechat/user/login', data, 'application/x-www-form-urlencoded', true),
//     // 查询用户信息
//     getMallUser: (data) => request.post(prefix + '/wechat/user/getMallUser', data, 'multipart/form-data', true),
//     // 查询单个系统缓存key
//     getSysConfigCache: (data) => request.post(prefix + '/wechat/user/getSysConfigCache', data, 'multipart/form-data', true),
//     // 查找字典数据
//     sysNormalDisable: (data) => request.get(prefix + '/wechat/user/type/sys_normal_disable', data, 'multipart/form-data', true),
//     // 查询单个商城缓存key
//     getConfigCache: (data) => request.post(prefix + '/wechat/user/getConfigCache', data, 'multipart/form-data', true),
//     // 编辑用户
//     editUserVo: (data) => request.post(prefix + '/wechat/user/editUserVo', data, 'multipart/form-data', true),
//     // 获取会员收藏信息
//     getScList: (data) => request.post(prefix + '/wechat/user/getScList', data, 'multipart/form-data', true),
//     // 新增收藏或分享
//     InsertSc: (data) => request.post(prefix + '/wechat/user/InsertSc', null, true),
//     // 根据openid查询积分列表
//     getIntegralList: (data) => request.post(prefix + '/wechat/user/getIntegralList', data, 'multipart/form-data', true),
//     // 查询产品列表
//     selectProductListVo: (data) => request.post(prefix + '/wechat/product/selectProductListVo', null, true),
//     // 查询产品sku
//     selectProductSkuggVo: (data) => request.post(prefix + '/wechat/product/selectProductSkuggVo', 'application/x-www-form-urlencoded', true),
//     // 查询产品sku的库存和价格
//     selectProductStock: (data) => request.post(prefix + '/wechat/product/selectProductStock', 'application/x-www-form-urlencoded', true),
//     // 通过产品编号查询产品
//     selectProductVo: (data) => request.post(prefix + '/wechat/product/selectProductVo', 'application/x-www-form-urlencoded', true),

// }