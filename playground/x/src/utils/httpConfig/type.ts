/// <reference types="@dcloudio/types" />
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export type RequestConfig = AxiosRequestConfig & Partial<UniNamespace.UploadFileOption> & {
    /** @deprecated 兼容旧版 */
    requestType?: string
    /**
     * 是否登录验证未通过时执行退出登录方法
     * @default true
     */
    withLogout?: boolean
    /**
     * 是否执行退出登录方法前弹出确认提示
     * @default true
     */
    withLogoutConfirm?: boolean
    /**
     * 是否提示报错信息
     * @default true
     */
    withMessage?: boolean
    /**
     * 是否返回response.data
     * @default true
     */
    withResponseData?: boolean
    /**
     * 是否在headers中加入Authorization
     * @default true
     */
    withToken?: boolean
    /**
     * 是否在headers中加入Clientid
     */
    withClientId?: boolean
    /**
     * 是否在headers中加入Tenantid
     */
    withTenantId?: boolean
    /**
     * 接口是否加密
     * @default false
     */
    withCrypto?: boolean
    /**
     * 是否为app端
     * @default false
     */
    isApp?: boolean
    /** 退出登录方法 */
    logout?: () => void
    /**
     * clientId名
     * @default Clientid
     */
    clientIdName?: string
    /**
     * tenantId名
     * @default Tenantid
     */
    tenantIdName?: string
    /**
     * token名
     * @default Authorization
     */
    tokenName?: string
    /** 客户端id */
    clientId?: string | (() => string)
    /** 租户id */
    tenantId?: string | (() => string)
    /** token */
    token?: string | (() => string)
    /** 加密的公钥 */
    publicKey?: string
    /** 解密的私钥 */
    privateKey?: string
    /**
     * secretKey名
     * @default secret-key
     */
    secretKeyName?: string
}

export interface RequestInstance extends AxiosInstance {
    <R = any>(config: RequestConfig): Promise<R>
    <R = any>(url: string, config?: RequestConfig): Promise<R>
    getUri: (config?: RequestConfig) => string
    request: <R = any>(config: RequestConfig) => Promise<R>
    get: <R = any>(url: string, config?: RequestConfig) => Promise<R>
    delete: <R = any>(url: string, config?: RequestConfig) => Promise<R>
    head: <R = any>(url: string, config?: RequestConfig) => Promise<R>
    options: <R = any>(url: string, config?: RequestConfig) => Promise<R>
    post: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
    put: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
    patch: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
    postForm: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
    putForm: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
    patchForm: <R = any>(url: string, data?: any, config?: RequestConfig) => Promise<R>
}

export type Res<T = any> = { code: number, msg: string } & T

export type ResData<T = any> = Res<{ data: T }>

export type ResRecords<T = any> = ResData<{ records: T, current: number, pages: number, size: number, total: number }>

export interface Page extends Sort {
    current?: number
    size?: number
}

export interface Sort {
    ascs?: string
    descs?: string
}
