<template>
    <view class="number-input">
        <view class="decrease-btn">
            <u-icon @click="decrease" :custom-style="{margin: 'auto'}" name="minus"></u-icon>
        </view>
        <view class="input-wrapper">
            <u-input type="number" input-align="center" v-model="inputValue" @input="input" />
        </view>
        <view class="increase-btn">
            <u-icon @click="increase" :custom-style="{margin: 'auto'}" name="plus"></u-icon>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: -1
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            inputValue: 0
        }
    },
    methods: {
        decrease() {
            if (this.inputValue <= this.min) {
                return
            }
            this.inputValue--
            this.input(this.inputValue)
        },
        increase() {
            if (this.max <= -1 || this.max >= 0 && this.inputValue < this.max) {
                this.inputValue++
            }
            
            this.input(this.inputValue)
        },
        input(value) {
            this.$emit('input', value)
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(n) {
                this.inputValue = n
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.number-input {
    display: flex;
    width: 100%;
    height: 58px;
    line-height: 56px;
    border: 1px solid #d7d7d7;
    border-radius: 29px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    .decrease-btn,
    .increase-btn {
        flex: 1;
        text-align: center;
        line-height: 56px;
    }
    .input-wrapper {
        width: 45%;
        border-left: 1px solid #d7d7d7;
        border-right: 1px solid #d7d7d7;
    }
}
</style>