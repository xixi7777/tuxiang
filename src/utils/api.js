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
    /**
     * 查询单个系统缓存key
     * @param {object} data 
     * key:
     * mall.system.phone: 客服电话
     * @returns 
     */
    getSysConfigCache: data => {
        return request({
            url: '/wechat/user/getSysConfigCache',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
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
    /**
     * 查询系统配置
     * @param {object} data 
     * key: 
     * mall.system.policy: 用户协议
     * mall.system.bannl: 首页配置
     * mall.system.phb: 排行榜配置
     * @returns 
     */
    getConfigCache: data => {
        return request({
            url: '/wechat/user/getConfigCache',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
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
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 新增收藏或分享
    InsertSc: data => {
        return request({
            url: '/wechat/user/InsertSc',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 根据openid查询积分列表
    getIntegralList: data => {
        return request({
            url: '/wechat/user/getIntegralList',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
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
            url: `/wechat/team/${data.teamId}`,
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
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
            header: {
                'content-type': 'application/json'
            }
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
    },
    // 上传文件
    uploadFile: data => {
        return request({
            url: '/file/upload/uploadFile',
            method: 'POST',
            data
        })
    },
    // 下单
    addOrder: data => {
        return request({
            url: '/wechat/order/add',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 订单列表
    orderList: data => {
        return request({
            url: '/wechat/order/list',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 订单详情
    orderDetail: data => {
        return request({
            url: `/wechat/order/getByOrder/${data.id}`,
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 申请退款
    applyRefund: data => {
        return request({
            url: '/wechat/order/applyRefund',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 退款原因类型
    mallOrderRefund: data => {
        return request({
            url: '/wechat/user/type/mall_order_refund',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    orderConfigType: data => {
        return request({
            url: `/wechat/order/type/${data.code}`,
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 我的团队列表
    myTeamList: data => {
        return request({
            url: '/wechat/team/myTeamList',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 团队活动列表
    teamActivity: data => {
        return request({
            url: '/wechat/team/activity/list',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 添加团队活动
    addActivity: data => {
        return request({
            url: '/wechat/team/activity/add',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 创建活动关联产品列表
    activityProduct: data => {
        return request({
            url: '/wechat/product/zdlist',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
    },
    // 活动报名列表
    activityUserList: data => {
        return request({
            url: '/wechat/team/activity/activityUserList',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 活动报名
    addUserInActivity: data => {
        return request({
            url: '/wechat/team/activity/addActivity',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 独立成团
    mallLeagueVo: data => {
        return request({
            url: '/wechat/product/selectMallLeagueVo',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 新增意见反馈
    insertFeedback: data => {
        return request({
            url: '/wechat/user/insertMallYjfk',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 出行人列表
    cxrList: data => {
        return request({
            url: '/wechat/order/getCxrListByOpenid',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 获取团队详情
    teamDetail: data => {
        return request({
            url: '/wechat/team/getTeamInfo',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 加入团队
    joinTeam: data => {
        return request({
            url: '/wechat/team/joinTeam',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 订单支付
    paidByOrderNo: data => {
        return request({
            url: `/wechat/order/pay?orderNo=${data.orderNo}`,
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 退团/解散
    quitTeam: data => {
        return request({
            url: '/wechat/team/quitTeam',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 获取团队职务列表
    teamPosition: data => {
        return request({
            url: '/wechat/team/positionList',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 修改团队成员信息
    manageMember: data => {
        return request({
            url: '/wechat/team/manageTeam',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    getXllxCode: data => {
        return request({
            url: '/wechat/user/type/mall_cpfl',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 取消订单
    cancelOrder: data => {
        return request({
            url: '/wechat/order/cancel',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 删除出行人
    removeCxr: data => {
        return request({
            url: '/wechat/order/removeCxr',
            method: 'POST',
            data,
            header: {
                'content-type': 'multipart/form-data'
            }
        })
    },
    // 添加出行人
    addCxr: data => {
        return request({
            url: '/wechat/order/addCxr',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 编辑出行人
    editCxr: data => {
        return request({
            url: '/wechat/order/editCxr',
            method: 'POST',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 取消活动报名
    cancelActivity: data => {
        return request({
            url: '/wechat/team/activity/cancelActivity',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    },
    // 出发地
    departures: data => {
        return request({
            url: '/wechat/user/type/mall_cfd',
            method: 'GET',
            data,
            header: {
                'content-type': 'application/json'
            }
        })
    }
}