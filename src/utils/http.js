import config from './config.js';

export default class Request {
	http(param) {
		var url = param.url,
			method = param.method,
			header = {
				'content-type': 'multipart/form-data',
				...param.header
			},
			data = param.data || {},
			hideLoading = param.hideLoading || false;
		const requestUrl = `${config.httpUrl}${url}`;

		if (!hideLoading) {
			uni.showLoading({ title: '加载中...', mask: true })
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUrl,
				data,
				method,
				header,
				success: res => {
					console.log(res)
					if (res.data.code === 200) {
						resolve(res.data)
					} else {
						if (res.data.code && (res.data.code === 401 || res.data.code === 403)) {
							uni.showToast({
								icon: 'none',
								title: '登录身份已过期，请重新登录'
							})
							uni.removeStorageSync('userinfo')
							uni.removeStorageSync('openid')
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/index'
								})
							})
						} else {
							uni.showToast({
								title: `app 错误${res.msg}`,
								icon: 'none'
							})
							return
						}
					}
				},
				fail: err => {
					console.log(err)
					uni.showToast({
						title: `${err.data.msg}`,
						icon: 'none'
					})
					reject(err.data)
				},
				complete: () => {
					if (!hideLoading) {
						uni.hideLoading()
					}
					resolve()
					return
				}
			})
		})
	}
}
