
import { requestURL } from '../config'
let user = {
}
function getType(user, data, method = 'get') { // 获取请求方式
	let type = {}
	if (method == 'post') {
		type = {
			method,
			data: {
				...user,
				...data
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}
	} else {
		type = {
			method,
			params: {
				...data
			}
		}
	}
	return type
}

function Request(url, data, method) {
	return new Promise((resolve, reject) => {
		//uni.showLoading()
		uni.request({
			url: requestURL + url,
			...getType(user, data, method),
			success: res => {
				resolve(res)
			},
			fail: err => {
				//uni.hideLoading()
				console.log('err')
				reject(err)
			}
		})
	}).catch(err => console.log(err))
}


export default function(data, url, method) {
	return Request(data, url, method)
}