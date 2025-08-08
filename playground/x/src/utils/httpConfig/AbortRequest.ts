import type { AxiosRequestConfig } from 'axios'
//重复请求中断
class AbortRequest {
    list: Map<string, AbortController>;
    constructor() {
        //请求中断控制器集合
        this.list = new Map()
    }
    //创建中断请求控制器
    create(key: string, config: AxiosRequestConfig): void {
        const controller = new AbortController()
        config.signal = controller.signal
        //集合中存在当前一样的请求，直接中断        
        if (this.list.has(key)) {
            controller.abort()
        } else {
            this.list.set(key, controller)
        }
    }
    //请求完成后移除集合中的请求
    remove(key: string) {
        this.list.delete(key)
    }
}
export const abortRequest = new AbortRequest()