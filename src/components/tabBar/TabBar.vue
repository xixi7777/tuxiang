<template>
<view class="tabbar-wrapper">
    <u-tabbar
	:value="value"
	:placeholder="false"
	:safeAreaInsetBottom="false"
    activeColor="#17AA7D"
    :border="false"
    >
	<u-tabbar-item v-for="item in list" :key="item.pagePath" :text="item.text" @click="change">
        <image
			class="u-page__item__slot-icon"
			slot="active-icon"
			:src="item.selectedIconPath"
		></image>
        <image
			class="u-page__item__slot-icon"
			slot="inactive-icon"
            :src="item.iconPath"
		></image>
    </u-tabbar-item>
</u-tabbar>
</view>
</template>
<script>
export default {
    props: {
        current: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            value: 0,
            list: [
                {
                    pagePath: 'pages/tabBar/home/index',
                    iconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/home.png',
                    selectedIconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/home_selected.png',
                    text: '首页',
                    customIcon: false
                },
                {
                    pagePath: 'pages/tabBar/spellGroup/index',
                    iconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/spell_group.png',
                    selectedIconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/spell_group_selected.png',
                    text: '拼团',
                    customIcon: false
                },
                {
                    pagePath: 'pages/tabBar/teams/index',
                    iconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/teams.png',
                    selectedIconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/teams_selected.png',
                    text: '团队',
                    customIcon: false
                },
                {
                    pagePath: 'pages/tabBar/personal/index',
                    iconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/me.png',
                    selectedIconPath: '///mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/me_selected.png',
                    text: '我的',
                    customIcon: false
                }
            ]
        }
    },
    created() {
        this.value = this.current
    },
    methods: {
        change(index) {
            this.value = index
            console.log(this.list[index].pagePath)
            uni.switchTab({
                url: `/${this.list[index].pagePath}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.u-page__item__slot-icon {
    width: 34px;
    height: 34px;
}
.tabbar-wrapper {
    overflow: hidden;
    height: 98px;
    background: #FFFFFF;
    box-shadow: 0px -7px 15px 0px rgba(65,107,91,0.1000);
    border-radius: 33px 33px 0px 0px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
}
</style>