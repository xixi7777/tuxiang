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
					if (res.data.code === 200) {
						resolve(res.data)
					} else {
						if (res.data.code === 401 || res.data.code === 403) {
							uni.showToast({
								icon: 'none',
								title: '登录身份已过期，请重新登录',
								mask: true,
								duration: 3000
							})
							uni.removeStorageSync('userinfo')
							uni.removeStorageSync('openid')
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/login/index'
								})
							})
						} else if (!res.data.msg) {
							setTimeout(() => {
								uni.showToast({
									title: '服务异常，请反馈至网站管理员',
									icon: 'none',
									mask: true,
									duration: 3000
								})
							}, 500)
						} else {
							setTimeout(() => {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									mask: true,
									duration: 3000
								})
							}, 500)
							// reject(res.data)
						}
					}
				},
				fail: err => {
					setTimeout(() => {
						uni.showToast({
							title: err.data.msg,
							icon: 'none',
							mask: true,
							duration: 2000
						})
					}, 300)
					// reject(err.data)
				},
				complete: () => {
					if (!hideLoading) {
						uni.hideLoading()
					}
					// resolve()
					// return
				}
			})
		})
	}
}
