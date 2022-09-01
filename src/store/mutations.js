
export default {
    setCurrentTab(state, current) {
        state.currentTab = current
    },
    setAppid(state, appid) {
        state.appid = appid
    },
    setCxrSelectedList(state, cxrSelectedList) {
        state.cxrSelectedList = cxrSelectedList
    },
    setOrderProduct(state, orderProduct) {
        state.orderProduct = orderProduct
    },
    setProductSkuList(state, productSkuList) {
        state.productSkuList = productSkuList
    },
    setOrderInfo(state, orderInfo) {
        state.orderInfo = orderInfo
    },
    setCxrList(state, cxrList) {
        console.log(cxrList)
        state.cxrList = cxrList
    },
    setOrderStatus(state, orderStatus) {
        state.orderStatus = orderStatus
    },
    setZjlxOptions(state, zjlxOptions) {
        state.zjlxOptions = zjlxOptions
    },
    setCxlxOptions(state, cxlxOptions) {
        state.cxlxOptions = cxlxOptions
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    setIndividual(state, individual) {
        state.isIndividual = individual
    }
}