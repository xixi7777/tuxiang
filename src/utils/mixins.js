import { mapMutations } from "vuex"
import config from '@/utils/config'
export default {
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
    onShow() {
        if (!uni.getStorageSync('openid')) {
            let pages = getCurrentPages()
            // let lastPage = pages.length >= 2 ? pages[pages.length-2] : {}

            let currentRoute = pages[pages.length - 1].route
            let currentURl = `/${currentRoute}`
            if (!config.whiteList.includes(currentURl)) {
                uni.navigateTo({
                    url: config.loginPage
                })
            }
        }
    },
    computed: {
        logined() {
            return !!uni.getStorageSync('openid')
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        navigateBack() {
            const pages = getCurrentPages()
            if (pages.length === 1) {
                uni.switchTab({ url: '/pages/tabBar/home/index'})
            } else {
                uni.navigateBack()
            }
        },
        getUserInfo() {
            const openid = uni.getStorageSync('openid')
            if (openid) {
                this.$api.getMallUser({ openid }).then(res => {
                    this.setUserInfo(res.data)
                    uni.setStorageSync('userInfo', JSON.stringify(res.data))
                })
            }
        }
    }
}