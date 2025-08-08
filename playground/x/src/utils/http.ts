import axios from 'axios'
import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'
import {
	abortRequest,
	requestQueue,
	handleNetworkError
} from './httpConfig/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
	easing: 'ease-in-out',
	speed: 300,
	trickleSpeed: 300
})

export function isAddQueue(url: string) {
	return requestQueue.queueList[url] ? true : false
}
export function useAxios() {
	const instance: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_BASE_API,
		timeout: import.meta.env.VITE_API_TIMEOUT
	})
	// 请求拦截器
	instance.interceptors.request.use(
		(
			config: AxiosRequestConfig
		): Promise<InternalAxiosRequestConfig<any>> => {
			if (config.url !== 'login') {
				config.headers!['clientid'] = import.meta.env.VITE_CLIENT_ID
				config.headers!['Authorization'] = 'Bearerxxxx'
			}
			// 重复请求中断：请求方法-请求地址-请求头-请求参数-请求体
			const key = `${config.method}-${config.url}`
			abortRequest.create(key, config)

			//加入请求等待队列
			if (isAddQueue(config.url as string)) {
				return requestQueue.addRequest(
					config.url as string,
					config as InternalAxiosRequestConfig<any>
				)
			}
			NProgress.start()
			return Promise.resolve(config)
		},
		error => {
			NProgress.done()
			return Promise.reject(error)
		}
	)
	// 响应拦截器
	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			NProgress.done()
			const config = response.config
			const key = `${config.method}-${config.url}`
			abortRequest.remove(key)
			if (isAddQueue(config.url as string)) {
				requestQueue.next(config.url as string)
			}
			return response
		},
		error => {
			NProgress.done()
			const key = `${error.config.method}-${error.config.url}`
			abortRequest.remove(key)
			handleNetworkError(error.response.status)
			return Promise.reject(error)
		}
	)
	return instance
}

export const request = useAxios()
