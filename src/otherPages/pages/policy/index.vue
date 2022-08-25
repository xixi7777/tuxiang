<template>
    <view class="app-container">
        <top :title="title" />
        <view class="content">
            <view v-html="content"></view>
        </view>
    </view>
</template>
<script>
import Top from '@/components/top/Top'
import graceRichText from '@/utils/formatRichText'
export default {
    components: {
        Top
    },
    data() {
        return {
            key: '',
            content: ''
        }
    },
    onLoad(option) {
        console.log(option.key)
        this.key = option.key
        this.getPolicy(option.key)
    },
    computed: {
        title() {
            if (this.key == 'mall.system.policy') {
                return '用户协议'
            }
            return '关于我们'
        }
    },
    methods: {
        getPolicy(key) {
            this.$api.getConfigCache({
                key
            }).then(res => {
                this.content = graceRichText.format(res.data[key].keyValue)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.content {
    margin-top: 190px;
}
</style>
