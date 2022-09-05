import { mapMutations } from "vuex"
export default {
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
            this.$api.getMallUser({ openid }).then(res => {
                this.setUserInfo(res.data)
            })
        }
    }
}