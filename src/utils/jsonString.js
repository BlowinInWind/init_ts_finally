/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-const-assign */
/* eslint-disable no-prototype-builtins */
// 确认一个对象是否存在循环引用

const isCyclic = obj => {
    // 使用Set数据类型来存储已经检测过的对象
    const stackSet = new Set();
    const detected = false;

    const detect = obj => {
        // 不是对象类型的话，可以直接跳过
        if (obj && typeof obj !== 'object') {
            return;
        }
        // 当要检查的对象已经存在于stackSet中时，表示存在循环引用
        if (stackSet.has(obj)) {
            return (detected = true);
        }
        // 将当前obj存如stackSet
        stackSet.add(obj);

        for (const key in obj) {
            // 对obj下的属性进行挨个检测
            if (obj.hasOwnProperty(key)) {
                detect(obj[key]);
            }
        }
        // 平级检测完成之后，将当前对象删除，防止误判
        /*
          例如：对象的属性指向同一引用，如果不删除的话，会被认为是循环引用
          let tempObj = {
            name: '前端'
          }
          let obj4 = {
            obj1: tempObj,
            obj2: tempObj
          }
        */
        stackSet.delete(obj);
    };

    detect(obj);

    return detected;
};

const getType = s => {
    return Object.prototype.toString
        .call(s)
        .replace(/\[object (.*?)\]/, '$1')
        .toLowerCase();
};

function jsonString(data) {
    // 特性七:
    // 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

    if (isCyclic(data)) {
        throw new TypeError('Converting circular structure to JSON');
    }

    // 特性九:
    // 当尝试去转换 BigInt 类型的值会抛出错误
    if (typeof data === 'bigint') {
        throw new TypeError('Do not know how to serialize a BigInt');
    }

    const type = typeof data;
    const commonKeys1 = ['undefined', 'function', 'symbol'];

    // 非对象
    if (type !== 'object' || data === null) {
        let result = data;
        // 特性四：
        // NaN 和 Infinity 格式的数值及 null 都会被当做 null。
        if ([NaN, Infinity, null].includes(data)) {
            result = 'null';
            // 特性一：
            // `undefined`、`任意的函数`以及`symbol值`被`单独转换`时，会返回 undefined
        } else if (commonKeys1.includes(type)) {
            // 直接得到undefined，并不是一个字符串'undefined'
            return undefined;
        } else if (type === 'string') {
            result = `"${data}"`;
        }
        return String(result);
    }
    if (type === 'object') {
        // 特性五:
        // 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
        // 特性六:
        // Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
        if (typeof data.toJSON === 'function') {
            return jsonString(data.toJSON());
        }
        if (Array.isArray(data)) {
            const result = data.map(it => {
                // 特性一:
                // `undefined`、`任意的函数`以及`symbol值`出现在`数组`中时会被转换成 `null`
                return commonKeys1.includes(typeof it)
                    ? 'null'
                    : jsonString(it);
            });

            return `[${result}]`.replace(/'/g, '"');
        }

        // 特性二：
        // 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
        if (['boolean', 'number'].includes(getType(data))) {
            return String(data);
        }

        // 特性八
        // 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
        const result = [];
        Object.keys(data).forEach(key => {
            // 特性三:
            // 所有以symbol为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
            if (typeof key !== 'symbol') {
                const value = data[key];
                // 特性一
                // `undefined`、`任意的函数`以及`symbol值`，出现在`非数组对象`的属性值中时在序列化过程中会被忽略
                if (!commonKeys1.includes(typeof value)) {
                    result.push(`"${key}":${jsonString(value)}`);
                }
            }
        });

        return `{${result}}`.replace(/'/, '"');
    }
}

console.log(jsonString(undefined)); // undefined
console.log(jsonString(() => {})); // undefined
console.log(jsonString(Symbol('前端'))); // undefined
console.log(jsonString(NaN)); // null
console.log(jsonString(Infinity)); // null
console.log(jsonString(null)); // null
console.log(
    jsonString({
        name: {
            a: '1'
        },
        sex: 'boy'
    })
); // null

// {"name":"前端2","sex":"boy"}

// 2. 和原生的JSON.stringify转换进行比较
console.log(jsonString(null) === JSON.stringify(null));
// true
console.log(jsonString(undefined) === JSON.stringify(undefined));
// true
console.log(jsonString(false) === JSON.stringify(false));
// true
console.log(jsonString(NaN) === JSON.stringify(NaN));
// true
console.log(jsonString(Infinity) === JSON.stringify(Infinity));
// true
const str = '前端';
console.log(jsonString(str) === JSON.stringify(str));
// true
const reg = new RegExp('w');
console.log(jsonString(reg) === JSON.stringify(reg));
// true
const date = new Date();
console.log(jsonString(date) === JSON.stringify(date));
// true
const sym = Symbol('前端');
console.log(jsonString(sym) === JSON.stringify(sym));
// true
const array = [1, 2, 3];
console.log(jsonString(array) === JSON.stringify(array));
