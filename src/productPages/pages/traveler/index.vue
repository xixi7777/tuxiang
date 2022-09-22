<template>
    <view class="app-container">
        <view class="app-top-background"></view>
        <top title="详情" text-left background-color="transparent" />
        <view class="add-wrap">
            <view class="add-box">
                <view><text>常用出行人信息</text></view>
                <view class="button-wrapper" v-if="!readonly">
                    <u-button type="primary" shape="circle" @click="openAdd"><u-icon color="#fff" size="12" name="plus"></u-icon>添加</u-button>
                </view>
            </view>
        </view>
        <view class="traveler-list">
            <u-checkbox-group 
            :disabled="readonly" 
            @change="checkboxGroupChange" 
            wrap 
            :iconColor="readonly?'#17AA7D':'#fff'"
            active-color="#17AA7D">
                <view class="traveler-item" v-for="(item, index) in travelerList" :key="item.zjhm">
                    <u-checkbox 
                        :name="item.zjhm"
                        :checked="item.checked"
                        :disabled="readonly || (!item.checked && selectedCount == count)"
                    ></u-checkbox>
                    <view @click="checkboxChange(item)">
                        <view class="name">{{ item.xm }}</view>
                        <view><text class="label">电话</text><text>{{ item.lxdh }}</text></view>
                        <view><text class="label">证件号</text><text>{{ item.zjhm }}</text></view>
                        <view><text class="label">证件类型</text><text>{{ zjlxLabel(item) }}</text></view>
                        <view><text class="label">人员类型</text><text>{{ cxlxLabel(item) }}</text></view>
                    </view>
                    <view class="delete-icon" v-if="!readonly">
                        <u-icon name="edit-pen" color="#2979ff" size="24" @click="edit(item, index)"></u-icon>
                        <u-icon name="trash" color="#fa3534" size="24" @click="remove(item, index)"></u-icon>
                    </view>
                </view>
            </u-checkbox-group>
        </view>

        <view class="bottom-btn">
            <u-button type="primary" shape="circle" @click="confirm" :disabled="!selectedCount">完成</u-button>
        </view>
        <u-modal 
        :show="modalVisible" 
        title="添加"
        closeOnClickOverlay
        :show-confirm-button="false"
        @close="modalVisible=false"
        >
            <view class="slot-content">
                <u-form :model="form" :rules="rules" ref="uForm" label-position="top" label-width="600">
                    <u-form-item label="姓名" prop="xm">
                        <u-input v-model="form.xm" border="bottom" />
                    </u-form-item>
                    <u-form-item label="电话" prop="lxdh">
                        <u-input type="number" border="bottom" v-model="form.lxdh" />
                    </u-form-item>
                    <u-form-item label="证件类型" prop="zjlx">
                        <view class="picker-input">{{ zjlxText }} 
                            <!-- <u-icon name="arrow-right"></u-icon> -->
                        </view>
                        <u-picker 
                        :show="showZjlx"
                        :columns="[zjlxOptions]" 
                        @cancel="showZjlx = false" 
                        keyName="label"
                        @confirm="confirmZjlx"></u-picker>
                    </u-form-item>
                    <u-form-item label="证件号" prop="zjhm">
                        <u-input type="text" v-model="form.zjhm" border="bottom" />
                    </u-form-item>
                    <u-form-item label="出行人类型">
                        <view class="picker-input" @click="showCxlxPicker">{{ cxlxText }} <u-icon name="arrow-right"></u-icon> </view>
                        <u-picker 
                        :show="showCxlx"
                        :defaultIndex="0"
                        :columns="[cxlxOptions]" 
                        keyName="label"
                        @cancel="showCxlx = false" 
                        @confirm="confirmCxlx"></u-picker>
                    </u-form-item>
                </u-form>
                <u-button v-if="!form.id" type="primary" shape="circle" @click="submit">添加</u-button>
                <u-button v-else type="primary" shape="circle" @click="update">修改</u-button>
            </view>
        </u-modal>
    </view>
</template>

<script>
import Top from '@/components/top/Top'
import { mapMutations, mapGetters } from 'vuex';
import _ from 'lodash'
export default {
    components: {
        Top
    },
    data() {
        return {
            modalVisible: false,
            showZjlx: false,
            showCxlx: false,
            cxrChecked: [],
            readonly: false,
            cxrIds: [],
            count: 0,
            selectedCount: 0,
            form: {
                xm: '',
                lxdh: '',
                zjlx: '1',
                zjhm: '',
                cxlx: '',
                bz: ''
            },
            rules: {
                xm: [
                    { required: true, message: '请输入姓名', trigger: ['change'] }
                ],
                lxdh: [
                    { required: true, message: '请输入联系电话', trigger: ['change'] },
                    {
                        validator: (rule, value, callback) => {
                            return this.$u.test.mobile(value);
                        },
                        message: '手机号码不正确',
                        trigger: ['change','blur'],
                    }
                ],
                zjlx: [
                    { required: true, message: '请选择证件类型', trigger: ['change'] }
                ],
                zjhm: [
                    { required: true, message: '请输入证件号码', trigger: ['change'] }
                ],
                cxlx: [
                    { required: true, message: '请选择出行人类型', trigger: ['change'] }
                ]
            },
            travelerList: []
        }
    },
    computed: {
        ...mapGetters(['cxrSelectedList', 'cxrList', 'cxlxOptions', 'zjlxOptions', 'orderInfo']),
        cxlxText() {
            let label = ''
            this.cxlxOptions.forEach(item => {
                if (item.value == this.form.cxlx) {
                    label = item.label
                }
            })
            return label
        },
        zjlxText() {
            let label = ''
            this.zjlxOptions.forEach(item => {
                if (item.value == this.form.zjlx) {
                    label = item.label
                }
            })
            return label
        },
        orderCount() {
            return _.get(this.orderInfo, ['orderCount'])
        }
    },
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
        setTimeout(() => {
            this.getCxrList()
        }, 500)
    },
    onLoad(option) {
        this.readonly = option.readonly || false
        this.count = option.count || 0
        if (option.cxrIds) {
            this.cxrIds = option.cxrIds.split(',')
            this.selectedCount = this.cxrIds.length
        }
    },
    methods: {
        ...mapMutations(['setCxrSelectedList', 'setCxrList', 'setCxlxOptions', 'setZjlxOptions']),
        getCxrList() {
            this.$api.cxrList({
                openid: uni.getStorageSync('openid')
            }).then(res => {
                if (res.data.length) {
                    this.travelerList = res.data
                    if (this.cxrIds.length) {
                        this.checkboxGroupChange(this.cxrIds)
                    } else {
                        this.setCxrList(this.travelerList)
                    }
                }
            })
        },
        getCxlx() {
            this.$api.orderConfigType({ code: 'mall_order_people' }).then(res => {
                this.setCxlxOptions(res.data)
            })
        },
        getZjlx() {
            this.$api.orderConfigType({ code: 'mall_order_docment' }).then(res => {
                this.setZjlxOptions(res.data)
            })
        },
        checkboxChange(item) {
            if (this.readonly || (!item.checked && this.selectedCount == this.count)) {
                return
            }
            item.checked = !item.checked
            let checkeds = this.travelerList.filter(i => i.checked)
            this.selectedCount = checkeds.length
            this.setCxrList(this.travelerList)
        },
        checkboxGroupChange(values) {
            this.cxrIds = values
            this.travelerList.forEach(item => {
                item.checked = false
            })
            values.forEach(item => {
                this.travelerList.forEach(l => {
                    if (l.zjhm == item) {
                        this.$set(l, 'checked', true)
                    }
                })
            })
            this.selectedCount = values.length
            this.setCxrList(this.travelerList)
        },
        confirm() {
            const selectedList = this.travelerList.filter(item => item.checked)
            this.setCxrSelectedList(selectedList) 
            let crCount = 0
            let etCount = 0
            let crIndex = _.findIndex(this.orderCount, item => item.value == 1)
            let etIndex = _.findIndex(this.orderCount, item => item.value == 2)
            if (crIndex >= 0) {
                crCount = this.orderCount[crIndex].count
            }
            if (etIndex >= 0) {
                etCount = this.orderCount[etIndex].count
            }

            let crCxr = selectedList.filter(item => item.cxlx == 1).length
            let etCxr = selectedList.filter(item => item.cxlx == 2).length
            if (crCount != crCxr || etCount!= etCxr) {
                uni.showToast({
                    title: '您选择出行人类型与订单的出行类型不一致，请重新选择',
                    icon: 'none',
                    mask: true,
                    duration: 2000
                })
                return
            }
            uni.navigateBack()
        },
        openAdd() {
            this.modalVisible = true
        },
        showZjlxPicker() {
            this.showZjlx = true
        },
        showCxlxPicker() {
            this.showCxlx = true
        },
        confirmZjlx(selector) {
            this.form.zjlx = selector.value[0].value;
            this.showZjlx = false
        },
        confirmCxlx(selector) {
            this.form.cxlx = selector.value[0].value;
            this.showCxlx = false
        },
        resetForm() {
            this.form = {
                xm: '',
                lxdh: '',
                zjlx: '',
                zjhm: '',
                cxlx: '',
                bz: ''
            }
            this.$refs.uForm.resetFields()
        },
        submit() {
            this.$refs.uForm.validate().then(res => {
                this.$api.addCxr({
                    openid: uni.getStorageSync('openid'),
                    ...this.form
                }).then(res => {
                    this.modalVisible = false
                    this.resetForm()
                    this.getCxrList()
                })
            })
        },
        update() {
            this.$api.editCxr({
                openid: uni.getStorageSync('openid'),
                ...this.form
            }).then(res => {
                this.modalVisible = false
                this.resetForm()
                this.getCxrList()
            })
        },
        zjlxLabel(item) {
            const target = _.find(this.zjlxOptions, i => i.value == item.zjlx)
            if (target) {
                return target.label
            }
            return ''
        },
        cxlxLabel(item) {
            const target = _.find(this.cxlxOptions, i => i.value == item.cxlx)
            if (target) {
                return target.label
            }
            return ''
        },
        remove(item, index) {
            uni.showModal({
                title: '温馨提示',
                content: '确定要删除此出行人吗？',
                success: res => {
                    if (res.confirm) {
                        if (item.id) {
                            this.$api.removeCxr({
                                id: item.id
                            }).then(res => {
                                this.getCxrList()
                            })
                        }
                    }
                }
            })
        },
        edit(item, index) {
            const temp = _.cloneDeep(item)
            this.form = {
                ...this.form,
                ...temp
            }
            this.openAdd()
        }
    },
    watch: {
        modalVisible: {
            handler(n) {
                if (!n && this.$refs.uForm) {
                    this.resetForm()
                }
            }
        },
        cxrList: {
            immediate: true,
            deep: true,
            handler(n) {
                if (n.length) {
                    this.travelerList = this.cxrList
                } else {
                    this.getCxrList()
                }
            }
        },
        cxlxOptions: {
            immediate: true,
            deep: true,
            handler(n) {
                if (!n.length) {
                    this.getCxlx()
                }
            }
        },
        zjlxOptions: {
            immediate: true,
            deep: true,
            handler(n) {
                if (!n.length) {
                    this.getZjlx()
                } else {
                    n.forEach(item => {
                        if (item.label.includes('身份证')) {
                            this.$set(this.form, 'zjlx', item.value)
                        }
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add-wrap {
    margin-top: 170px;
    border-radius: 0px 0px 0px 50px;

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
        align-items: center;
        padding: 0 30px;
        .button-wrapper {
            width: 160px;
            height: 60px;
        }
        /deep/
        .u-button {
            font-size: 24px;
            .u-icon {
                margin-right: 10px;
            }
        }
    }
}

.traveler-list {
    margin-bottom: 150px;
    /deep/ .u-checkbox-group {
        display: block;
        .u-checkbox__icon-wrap--disabled--checked {
            .u-icon__icon {
                color: #17AA7D !important;
            }
        }
    }
}
.traveler-item {
    position: relative;
    background: #fff;
    box-shadow: 0px 17px 23px 0px rgba(138, 131, 168, 0.1000);
    border-radius: 20px;
    padding: 25px 30px 55px 30px;
    font-size: 24px;
    color: #333333;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    /deep/ .u-checkbox__icon-wrap {
        border-color: #17AA7D !important;
        margin-top: 6px;
    }
    .name {
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 6px;
    }

    .label {
        width: 120px;
        display: inline-block;
    }
    &>view:last-child {
        margin-left: 16px;
        &>view:not(:first-child) {
            margin-top: 10px;
        }
    }
    .delete-icon {
        position: absolute;
        right: 30px;
        // width: 60px;
        /deep/ .u-icon {
            display: inline-block;
            &:last-child {
                margin-left: 20px;
            }
        }
    }
}
.slot-content {
    width: 500px;
    margin: 0 auto;
    /deep/ .u-button {
        width: 400px;
        height: 96px;
        margin: 0 auto;
    }
    /deep/
    .u-form-item__body__left__content__label {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 33px;
    }
    /deep/
    .u-border-bottom {
        padding-left: 0 !important;
        border-bottom: 1px solid #e2e2e2;
    }
    /deep/ .u-form-item__body__left {
        margin-bottom: 0 !important;
    }
}
.bottom-btn {
    display: flex;
}
</style>