export default {
    methods: {
        navigateBack() {
            const pages = getCurrentPages()
            if (pages.length === 1) {
                uni.switchTab({ url: '/pages/tabBar/home/index'})
            } else {
                uni.navigateBack()
            }
        }
    }
}