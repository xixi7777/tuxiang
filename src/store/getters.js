export default {
    currentTab: state => state.currentTab,
    appid: state => state.appid,
    cxrSelectedList: state => state.cxrSelectedList,
    orderProduct: state => state.orderProduct,
    productSkuList: state => state.productSkuList,
    orderInfo: state => state.orderInfo,
    cxrList: state => state.cxrList,
    orderStatus: () => {
        return {
            '0': '生成订单',
            '1': '订单关闭',
            '2,3': '退款',
            '4': '已完成',
            '5': '已支付'
        }
    }
}