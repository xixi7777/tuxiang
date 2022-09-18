export const waterfallMixins = {
    data() {
        return {
            // 瀑布流列表
            // wfList: [],
            updateNum: 10,
            allList: [], // 全部列表
            leftList: [], // 左边列表
            rightList: [], // 右边列表
            mark: 0, // 列表标记
            boxHeight: [], // 下标0和1分别为左列和右列高度
        };
    },
    watch: {
        // 监听列表数据变化
        wfList: {
            handler: function() {
                // 如果数据为空或新的列表数据少于旧的列表数据（通常为下拉刷新或切换排序或使用筛选器），初始化变量
                if (!this.wfList.length ||
                    (this.wfList.length === this.updateNum && this.wfList.length <= this.allList.length)) {
                    this.allList = [];
                    this.leftList = [];
                    this.rightList = [];
                    this.boxHeight = [];
                    this.mark = 0;
                }

                // 如果列表有值，调用waterfall方法
                if (this.wfList.length) {
                    this.allList = this.wfList;
                    this.waterFall()
                }
            },
            // 立即触发，无须等到他变化
            immediate: true
        },
        // 监听标记，当标记发生变化，则执行下一个item排序 
        mark() {
            const len = this.allList.length;
            if (this.mark < len && this.mark !== 0) {
                this.waterFall();
            }
        }
    },
    methods: {
        // 瀑布流排序
        waterFall() {
            const i = this.mark;
            if (i%2 === 0) {
                this.leftList.push(this.allList[i])
                this.mark = this.mark + 1
            }
            if (i%2 === 1) {
                this.rightList.push(this.allList[i])
                this.mark = this.mark + 1
            }
            // if (i === 0) {
            //     // 初始化，从左边开始插入
            //     this.leftList.push(this.allList[i]);
            //     // 更新左边列表高度
            //     this.getViewHeight(0);
            // } else if (i === 1) {
            //     // 第二个item插入，默认为右边插入
            //     this.rightList.push(this.allList[i]);
            //     // 更新右边列表高度
            //     this.getViewHeight(1);
            // } else {
            //     // 根据左右列表高度判断下一个item应该插入哪边
            //     const leftOrRight = this.boxHeight[0] > this.boxHeight[1] ? 1 : 0;
            //     console.log(this.boxHeight)
            //     if (leftOrRight) {
            //         this.rightList.push(this.allList[i])
            //     } else {
            //         this.leftList.push(this.allList[i])
            //     }
            //     // 更新插入列表高度
            //     this.getViewHeight(leftOrRight);
            // }
        },
        // 获取列表高度
        getViewHeight(leftOrRight) {
            const query = uni.createSelectorQuery().in(this)
            const id = leftOrRight ? '#right' : '#left';
            // 使用nextTick，确保页面更新结束后，再请求高度
            this.$nextTick(() => {
                query.select(id).boundingClientRect(res => {
                    res ? this.boxHeight[leftOrRight] = res.height : '';
                    this.mark = this.mark + 1;
                }).exec();
            })
        },

        // item点击
        itemTap(item) {
            this.$emit('itemTap', item)
        }
    }
}

