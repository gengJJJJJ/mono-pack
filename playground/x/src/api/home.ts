import {request} from '@/utils/http'
export function pageData(data = {}) {
	return request({
		url: `/measureApi/weChat/equipmentList`,
		method: 'post',
		data
	})
}
