<template>
    <view class="contact-container">
        <top title="详情" />
        <view class="add-wrap">
            <view class="add-box">
                <text>常用出行人信息</text>
                <button class="btn">添加</button>
            </view>
        </view>
        <view class="contact-list">
            <view class="contact-item" v-for="(item, index) in contactList">
                <image class="img" src="//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/icon_square.png">
                </image>
                <view class="name">{{ item.name }}</view>
                <view><text class="label">电话</text><text>{{ item.phone }}</text></view>
                <view><text class="label">证件号</text><text>{{ item.IdNo }}</text></view>
                <view><text class="label">证件类型</text><text>{{ item.IdType }}</text></view>
                <view><text class="label">人员类型</text><text>{{ item.passengerType }}</text></view>
            </view>
        </view>
    </view>
</template>

<script>
import Top from '@/components/top/Top'
export default {
    components: {
        Top
    },
    data() {
        return {
            contactList: [{
                name: '尚波',
                phone: '14297867755',
                IdType: '台湾通行证',
                IdNo: '566565651987812126776',
                passengerType: '成人'
            }, {
                name: '尚波',
                phone: '14297867755',
                IdType: '台湾通行证',
                IdNo: '566565651987812126776',
                passengerType: '成人'
            }, {
                name: '尚波',
                phone: '14297867755',
                IdType: '台湾通行证',
                IdNo: '566565651987812126776',
                passengerType: '成人'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.contact-container {
    padding: 365px 30px 30px;
}

.add-wrap {
    background: linear-gradient(180deg, #A1F5E2 0%, #EAF6F5 100%);
    border-radius: 0px 0px 0px 50px;
    padding: 30px;

    .add-box {
        height: 180px;
        background: #FFFFFF;
        box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
        border-radius: 20px;
        font-size: 32px;
        font-weight: 500;
        color: #17AA7D;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .btn {
            width: 120px;
            height: 60px;
            padding-left: 50px;
            background-image: url('//mall-lyxcx.oss-cn-hangzhou.aliyuncs.com/front_end/icon/icon_plus.png');
            background-position: 22px 22px;
            background-size: 16px;
            background-repeat: no-repeat;
            background-color: #17AA7D;
            border-radius: 48px;
            font-size: 24px;
            color: #fff;
        }
    }
}

.contact-item {
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
    border-radius: 20px;
    padding: 25px 30px 55px 80px;
    font-size: 24px;
    color: #333333;

    .img {
        position: absolute;
        left: 30px;

    }

    .name {
        font-size: 32px;
        font-weight: 500;
    }

    .label {
        width: 120px;
    }
}
</style>