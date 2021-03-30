/** @format */
/**
 * 存储
 *
 * @format
 * @param {*} key :键名
 * @param {*} value ：所存入的值
 */
export const setLocal = (key: string, value: string): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 读取
 * @param {*} key ：键名
 */
export const getLocal = (key: string): any => {
    if (!key) {
        return;
    }
    return localStorage.getItem(key);
};

// 删除本地临时存储
export const removeLocal = (key: string) => localStorage.removeItem(key);

// clear清除所有的key/value
export const clearLocal = () => localStorage.clear();

/**
 * 存储
 * @param {*} key :键名
 * @param {*} value ：所存入的值
 */
export const setSession = (key: string, value: string): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 读取
 * @param {*} key ：键名
 */
export const getSession = (key: string): void | any => {
    if (!key) {
        return;
    }
    return sessionStorage.getItem(key);
};

// 判断是否空字符
export const notNull = (str: string): boolean =>
    str !== undefined && str !== null && str !== '' && str.trim() !== '';

// 判断是否为手机号
export const isPoneAvailable = (phone: string): boolean => {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    }
    return true;
};

// 判断是否为电话号码
export const isTelAvailable = (tel: string): boolean => {
    const myreg = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (!myreg.test(tel)) {
        return false;
    }
    return true;
};

export const isEmailAvailable = (email: string): boolean => {
    const myreg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!myreg.test(email)) {
        return false;
    }
    return true;
};

/**
 * 判断是否为数字
 * @param num
 */
export const isNum = (num: string): boolean => {
    const myreg = new RegExp('^[0-9]*$');
    if (!myreg.test(num)) {
        return false;
    }
    return true;
};

/**
 * 判断是否是对象
 * @param obj
 */
export const isObj = (obj: any): boolean => {
    return (
        obj &&
        typeof obj === 'object' &&
        Object.prototype.toString.call(obj).toLowerCase() === '[object Object]'
    );
};

/**
 * 判断是否是数组
 * @param arr
 */
export const isArray = (arr: any) => {
    return arr && typeof arr === 'object' && arr.constructor === Array;
};

/**
 * 判断对象是否相等
 * @param objA
 * @param objB
 */
export const isObjectValueEqual = (objA: any, objB: any) => {
    return JSON.stringify(objA) === JSON.stringify(objB);
};

/**
 * 数组数字倒序是否正确
 * @param arr
 * @param order
 */
export const ArrayNumSortTure = (arr: Array<any>, order = false) => {
    let flag = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 1; j < arr.length; j++) {
            if (!order) {
                if (arr[i] && arr[j] && i < j && arr[i] <= arr[j]) {
                    flag = true;
                }
            } else if (arr[i] && arr[j] && i < j && arr[i] >= arr[j]) {
                flag = true;
            }
        }
    }
    return !flag;
};

/**
 * 扁平化数据结构 => 树形结构数据结构
 * @param items 原始数据
 * @param id 最外层父节点id
 * @param parentId 依据遍历的key
 * @returns {*}
 */

export const nest = (items: Array<any>, id = '-1', link = 'parentId'): any =>
    items
        .filter((item: any) => item[link] === id)
        .map(item => ({ ...item, children: nest(items, item.id) }));
