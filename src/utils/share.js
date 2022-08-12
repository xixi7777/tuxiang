export default {
    data() {
        return {}
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },
    onShareAppMessage(res) {
        const imageUrl = this.shareUrl || ''
        if (res.from === 'button') {
            const path = `/${this.$scope.route}?cpbh=${this.$scope.options.cpbh}`
            return {
                title: '商品分享',
                path,
                imageUrl
            }
        }
        if (res.from === 'menu') {
            return {
                title: '途享旅程',
                path: '/pages/tabBar/home/index',
                imageUrl
            }
        }
    },
    onShareTimeline() {
        const imageUrl = this.shareUrl || ''
        return {
            title: '途享旅程',
            path: '/pages/tabBar/home/index',
            imageUrl
        }
    },
    methods: {}
}