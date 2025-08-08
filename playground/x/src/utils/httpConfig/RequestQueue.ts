import type { InternalAxiosRequestConfig } from "axios";


//请求队列
class RequestQueue {
  isWaiting: boolean;
  queueList: Record<string, { resolve: () => void }[]>;
  constructor() {
    //请求队列
    this.queueList = {};
    //是否在等待上一个请求
    this.isWaiting = false;
  }
  addRequest(url: string, config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> {
    return new Promise((resolve) => {
      const list = this.queueList[url] || [];
      if (this.isWaiting) {
        //当前请求url存在等待发送的请求，则放入请求队列
        list.push({ resolve: () => resolve(config) });
      } else {
        //没有等待请求，直接发送
        resolve(config);
        this.isWaiting = true;
      }
      this.queueList[url] = list;
    });
  }
  //响应处理
  next(url: string) {
    this.isWaiting = false;
    //拿出当前请求url的下一个请求
    if (this.queueList[url]?.length > 0) {
      const nextRequest = this.queueList[url].shift();
      //执行请求
      nextRequest?.resolve();
    }
  }
}
export const requestQueue = new RequestQueue();
