let failMsgs = (txt, handle) => showToasts(txt, 2000, 'none', handle ? true : false, handle)

/**
 * 显示短时消息,允许重复弹出多个 不过后续的消息不保证顺序
 * txt 文本
 * time 显示时间 默认 2000 毫秒
 * icon 图标 目前就支持两种 success 和 none
 * mask 是否允许透点默认不允许
 */
let showToasts = (txt, time = 2000, icon, mask, handle) => {
    wx.showToast({
        title: txt,
        icon: icon ? icon : 'none',
        mask: mask ? mask : false,
        duration: time,
        success() {
            setTimeout(() => {
                handle && wx.hideToast(handle);
            }, time)
        }
    })
}

module.exports = {
    failMsgs,
}