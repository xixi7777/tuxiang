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
        const { options, $page } = this.$scope
        const { from, target } = res

        if (options.cpbh) {
            this.shareProduct($page.fullPath, options.cpbh, imageUrl)
        }
        console.log(from, target)
        if (from == 'button') {
            if (target.id && target.id == 'product_share') {
                const cpbh = options.cpbh || target.dataset.cpbh
                let image = target.dataset.image || imageUrl
                const path = `/productPages/pages/productDetail/index?cpbh=${cpbh}`
                this.shareProduct(path, cpbh, image)
            }
            if (target.id && target.id == 'invite_team') {
                
                const teamCode = target.dataset.teamCode
                const image = target.dataset.image || imageUrl
                const path = `/teamsPages/pages/myTeam/index?teamCode=${teamCode}`

                return {
                    title: '途享旅程',
                    path,
                    imageUrl: image
                }
            }
            if (target.id && target.id == 'share_activity') {
                const activityId = target.dataset.activityId
                const teamCode = target.dataset.teamCode
                const image = target.dataset.image || imageUrl
                const path = `/teamsPages/pages/myTeam/index?teamCode=${teamCode}&activityId=${activityId}`

                return {
                    title: '途享旅程',
                    path,
                    imageUrl: image
                }
            }
        }

        return {
            title: '途享旅程',
            path: $page.fullPath,
            imageUrl
        }        
    },
    onShareTimeline() {
        const imageUrl = this.shareUrl || ''
        const { $page } = this.$scope
        return {
            title: '途享旅程',
            path: $page.fullPath,
            imageUrl
        }
    },
    methods: {
        shareProduct(path, cpbh, imageUrl) {
            this.$api.InsertSc({
                openid: uni.getStorageSync('openid'),
                type: '0',
                cpbh
            }).then(res => {
                return {
                    title: '商品详情',
                    path,
                    imageUrl
                }
            })
        }
    }
}