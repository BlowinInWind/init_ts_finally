/** @format */

import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
    AxiosError
    // AxiosPromise
} from 'axios';
import qs from 'qs';
import { createBrowserHistory } from 'history';
import { clearLocal, getLocal } from '@utils/utils';

const history = createBrowserHistory();

// interface DefaultRequestOptions {
//     headers: {
//         [key: string]: {};
//     };
//     [key: string]: {};
// }

// type AxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer R> ? R : any

// 使用
// type Resp = AxiosReturnType<Api>

export interface ResponseInterface<T> {
    code: number;
    data: T;
    msg: string;
}

class BaseRequest {
    private dataMethodDefaults: AxiosRequestConfig;

    private defaultRequestOptions: AxiosRequestConfig;

    private request: AxiosInstance;

    constructor(options: AxiosRequestConfig) {
        this.dataMethodDefaults = {
            baseURL:
                process.env.NODE_ENV === 'production'
                    ? 'http://139.217.119.19:8180/prod-api'
                    : '/prod-api',
            timeout: 60000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            transformRequest: [
                (data: any, headers: any) => {
                    if (
                        headers['Content-Type'] ===
                        'application/x-www-form-urlencoded'
                    ) {
                        return qs.stringify(data);
                    }
                    if (headers['Content-Type'] === 'multipart/form-data') {
                        return data;
                    }
                    return JSON.stringify(data);
                }
            ]
        };

        this.defaultRequestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            ...options
        };

        this.request = axios.create({ ...this.dataMethodDefaults, ...options });

        // 请求参数可以做一些操作
        this.request.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                const token = getLocal('auth-token');
                if (getLocal('auth-token')) {
                    config.headers.Authorization = token; // 让每个请求携带自定义token 请根据实际情况自行修改
                }
                return config;
            },
            (err: AxiosError) => {
                return Promise.reject(err);
            }
        );

        // 请求响应拦截
        this.request.interceptors.response.use(
            (response: AxiosResponse) => {
                // 对响应数据做点什么
                return new Promise(resolve => {
                    const useResponse = response.data;
                    if (useResponse.code === 401) {
                        // 清楚缓存 这里先注释了吧
                        clearLocal();
                        const { pathname } = history.location;
                        window.location.reload();
                        history.replace({
                            pathname: '/',
                            state: {
                                redirect: pathname
                            }
                        });
                    } else {
                        resolve(response);
                    }
                });
            },
            (error: AxiosError) => {
                // 对响应错误做点什么
                let errMsg = '';
                if (error && error.response) {
                    switch (error.response.status) {
                        case 400:
                            errMsg = '请求错误';
                            break;
                        case 401:
                            errMsg = '未授权，请重新登录';
                            break;
                        case 403:
                            errMsg = '拒绝访问';
                            break;
                        case 404:
                            errMsg = '请求出错';
                            break;
                        case 405:
                            errMsg = '请求方式错误';
                            break;
                        case 408:
                            errMsg = '请求超时';
                            break;
                        case 500:
                            errMsg = '服务器错误';
                            break;
                        case 501:
                            errMsg = '服务未实现';
                            break;
                        case 502:
                            errMsg = '网络错误';
                            break;
                        case 503:
                            errMsg = '服务不可用';
                            break;
                        case 504:
                            errMsg = '网络超时(504)';
                            break;
                        case 505:
                            errMsg = 'HTTP版本不受支持';
                            break;
                        default:
                            errMsg = '连接出错!';
                    }
                }

                return new Promise(resolve => {
                    if (error.message === 'cancel') {
                        // todo
                    } else {
                        resolve({
                            data: {
                                msg: errMsg,
                                code: error.response.status
                            }
                        });
                    }
                });
            }
        );
    }

    get<T>(url: string, data = {}) {
        return this.request
            .get<ResponseInterface<T>>(url, data)
            .then((res: AxiosResponse<ResponseInterface<T>>) => {
                const useData: ResponseInterface<T> = res.data;
                return useData;
            });
    }

    post<T>(
        url: string,
        data: undefined | any = undefined,
        config: AxiosRequestConfig = {}
    ) {
        return this.request
            .post<ResponseInterface<T>>(url, data, {
                ...this.defaultRequestOptions,
                ...config
            })
            .then((res: AxiosResponse<ResponseInterface<T>>) => {
                const useData: ResponseInterface<T> = res.data;
                return useData;
            });
    }

    put<T>(
        url: string,
        data: undefined | any = undefined,
        config: AxiosRequestConfig = {}
    ) {
        return this.request
            .put<ResponseInterface<T>>(url, data, {
                ...this.defaultRequestOptions,
                ...config
            })
            .then((res: AxiosResponse<ResponseInterface<T>>) => {
                const useData: ResponseInterface<T> = res.data;
                return useData;
            });
    }

    delete<T>(url: string, data = {}) {
        return this.request
            .delete<ResponseInterface<T>>(url, data)
            .then((res: AxiosResponse<ResponseInterface<T>>) => {
                const useData: ResponseInterface<T> = res.data;
                return useData;
            });
    }

    upload<T>(
        url: string,
        data: undefined | any = undefined,
        config: AxiosRequestConfig = {}
    ) {
        return this.request
            .post<ResponseInterface<T>>(url, data, {
                ...config,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then((res: AxiosResponse<ResponseInterface<T>>) => {
                const useData: ResponseInterface<T> = res.data;
                return useData;
            });
    }

    downLoad<T>(
        url: string,
        data: undefined | { fileName: string } = undefined,
        config: AxiosRequestConfig = {}
    ) {
        return this.request
            .post<ResponseInterface<T>>(url, data, {
                ...this.defaultRequestOptions,
                ...config,
                responseType: 'blob'
            })
            .then((response: any) => {
                if (response.headers) {
                    let filename = response.headers; // 下载后文件名
                    filename = filename['content-disposition'];
                    filename = filename.split(';')[1].split('Filename=')[1];

                    const useData = response.data;
                    if (!useData) {
                        return new Promise(resolve => {
                            resolve({ success: false, msg: '文件下载失败' });
                        });
                    }
                    const downUrl = window.URL.createObjectURL(
                        new Blob([useData])
                    );
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = downUrl;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                    return new Promise(resolve => {
                        resolve({ success: true, msg: '文件下载成功' });
                    });
                }
            });
    }
}

// export function createHttpClient(options: AxiosRequestConfig = {}) {
//     return new BaseRequest(options);
// }

export default BaseRequest;
