import request from '../utils/request'
export default {
	getHomes(data) {
		return request ('/backapi/home/query').then(res => res);
	},
	getCategories(data) {
		return request ('/backapi/category/queryByPage',data,'post').then(res => res);
	},
	getProducts(data) {
		return request ('/backapi/product/queryByPage',data,'post').then(res => res);
	},
};