/** @format */

import BaseRequest from '@utils/request/BaseRequest';
import { AxiosRequestConfig } from 'axios';
/**
 * 可以使用createHttpClient重新更改请求头等信息
 * 也可以在get或者post的config添加特定的请求头信息
 */

const httpRequest: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

class BaseSubJsonRequest {
    /**
     * get
     * @param url 地址
     * @param data 数据
     * @param config 配置
     */
    static get<T>(url: string, data = {}, config = {}) {
        return new BaseRequest(httpRequest).get<T>(url, {
            ...config,
            params: { ...data }
        });
    }

    /**
     * post
     * @param url 地址
     * @param data 数据
     * @param config 配置
     */
    static post<T>(url: string, data: any = undefined, config = {}) {
        return new BaseRequest(httpRequest).post<T>(url, data, {
            ...config
            // headers: {
            //         'Content-Type': 'application/json'
            // },
        });
    }

    /**
     * put
     * @param url 地址
     * @param data 数据
     * @param config 配置
     */
    static put<T>(url: string, data: any = undefined, config = {}) {
        return new BaseRequest(httpRequest).put<T>(url, data, { ...config });
    }

    /**
     * delete
     * @param url 地址
     */
    static delete<T>(url: string, data = {}, config = {}) {
        return (
            new BaseRequest(httpRequest).delete<T>(url),
            {
                ...config,
                params: { ...data }
            }
        );
    }

    /**
     * post
     * @param url 地址
     * @param data 数据
     * @param config 配置
     */
    static downLoad<T>(url: string, data: any = undefined, config = {}) {
        return new BaseRequest(httpRequest).downLoad<T>(url, data, {
            ...config
            // headers: {
            //         'Content-Type': 'application/json'
            // },
        });
    }

    /**
     * upload
     * @param url 地址
     * @param data 数据
     * @param config 配置
     */
    static upload<T>(url: string, data: any = undefined, config = {}) {
        return new BaseRequest(httpRequest).upload<T>(url, data, { ...config });
    }
}

export default BaseSubJsonRequest;
