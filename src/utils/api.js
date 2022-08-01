import Request from './http'
let request = new Request().http

export default {
    // 小程序登录
    wxLogin: data => {
        return request({
            url: '/wechat/user/login',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 查询用户信息
    getMallUser: data => {
        return request({
            url: '/wechat/user/getMallUser',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 查询单个系统缓存key
    getSysConfigCache: data => {
        return request({
            url: '/wechat/user/getSysConfigCache',
            method: 'POST',
            data
        })
    },
    // 查找字典数据
    sysNormalDisable: data => {
        return request({
            url: '/wechat/user/type/sys_normal_disable',
            method: 'GET',
            data
        })
    },
    // 查询单个商城缓存key
    getConfigCache: data => {
        return request({
            url: '/wechat/user/getConfigCache',
            method: 'POST',
            data
        })
    },
    // 编辑用户
    editUserVo: data => {
        return request({
            url: '/wechat/user/editUserVo',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 获取会员收藏信息
    getScList: data => {
        return request({
            url: '/wechat/user/getScList',
            method: 'POST',
            data
        })
    },
    // 新增收藏或分享
    InsertSc: data => {
        return request({
            url: '/wechat/user/InsertSc',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 根据openid查询积分列表
    getIntegralList: data => {
        return request({
            url: '/wechat/user/getIntegralList',
            method: 'POST',
            data
        })
    },
    // 查询产品列表
    selectProductListVo: data => {
        return request({
            url: '/wechat/product/selectProductListVo',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 查询产品sku
    selectProductSkuggVo: data => {
        return request({
            url: '/wechat/product/selectProductSkuggVo',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 查询产品sku的库存和价格
    selectProductStock: data => {
        return request({
            url: '/wechat/product/selectProductStock',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 通过产品编号查询产品
    selectProductVo: data => {
        return request({
            url: '/wechat/product/selectProductVo',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 添加团队
    addTeam: data => {
        return request({
            url: '/wechat/team/add',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 获取详情
    teamDetail: data => {
        return request({
            url: `/wechat/team/${data.id}`,
            method: 'GET',
            data,
            header: {}
        })
    },
    // 团队列表
    teamList: data => {
        return request({
            url: '/wechat/team/list',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 编辑团队
    editTeam: data => {
        return request({
            url: '/wechat/team/edit',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 团员列表
    memberList: data => {
        return request({
            url: '/wechat/team/memberList',
            method: 'GET',
            data,
            header: {}
        })
    },
    // 添加团员
    addMember: data => {
        return request({
            url: '/wechat/team/addMember',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 获取职务列表
    positionList: data => {
        return request({
            url: '/wechat/team/positionList',
            method: 'GET',
            data,
            header: {}
        })
    },
    // 踢人
    removeMember: data => {
        return request({
            url: '/wechat/team/removeMember',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    }
}