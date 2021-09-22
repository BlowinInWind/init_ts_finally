import { unstable_batchedUpdates } from 'react-dom';

const formInstanceApi = [
    'setCallback',
    'dispatch',
    'registerValidateFields',
    'resetFields',
    'setFields',
    'setFieldsValue',
    'getFieldsValue',
    'getFieldValue',
    'validateFields',
    'submit',
    'unRegisterValidate'
];

/* 判断是否是正则表达式 */
const isReg = value => value instanceof RegExp;

class FormStore {
    [x: string]: any;

    public FormUpdate: any;

    public model: any;

    public control: any;

    public penddingValidateQueue: any;

    public defaultFormValue: any;

    public isSchedule: boolean;

    constructor(forceUpdate, defaultFormValue = {}) {
        this.FormUpdate = forceUpdate;
        this.model = {}; /* 表单状态层 */
        this.control = {}; /* 控制每个 formItem 的控制器  */
        this.isSchedule = false; /* 开启调度 */
        this.penddingValidateQueue = []; /* 批量更新队列 */
        this.callback = {}; /* 存放监听函数 callback */
        this.defaultFormValue = defaultFormValue; /* 表单初始化的值 */
    }

    getForm() {
        return formInstanceApi.reduce((map, item) => {
            map[item] = this[item].bind(this);
            return map;
        }, {});
    }

    static createValidate(validate) {
        const { value, rule, required, message } = validate;
        return {
            value,
            rule: rule || (() => true),
            required: required || false,
            message: message || '',
            status: 'pending'
        };
    }

    setCallback(callback) {
        if (callback) this.callback = callback;
    }

    dispatch(action, ...arg) {
        if (!action && typeof action !== 'object') {
            return null;
        }

        const { type } = action;
        if (formInstanceApi.indexOf(type)) {
            return this[type](...arg);
        }
        if (typeof this[type] === 'function') {
            return this[type](...arg);
        }
    }

    registerValidateFields(name, control, model) {
        if (this.defaultFormValue[name]) {
            model.value = this.defaultFormValue[name];
        }

        const validate = FormStore.createValidate(model);
        this.model[name] = validate;
        this.control[name] = control;
    }

    unRegisterValidate(name) {
        delete this.model[name];
        delete this.control[name];
    }

    notifyChange(name) {
        const controller = this.control[name];
        if (controller) {
            controller?.changeValue();
        }
    }

    setValueClearStatus(model, name, value) {
        model.value = value;
        model.status = 'pendding';
        this.notifyChange(name);
    }

    setFieldsValue(name, modelValue) {
        const model = this.model[name];
        if (!model) return;

        if (typeof modelValue === 'object') {
            const { message, rule, value } = modelValue;
            if (message) model.message = message;
            if (rule) model.rule = rule;
            if (value) model.value = value;
            model.status = 'pendding'; /* 设置待验证状态 */
            this.validateFieldValue(
                name,
                true
            ); /* 如果重新设置了验证规则，那么重新验证一次 */
        } else {
            this.setValueClearStatus(model, name, modelValue);
        }
    }

    setFields(object) {
        if (typeof object !== 'object') return;
        Object.keys(object).forEach(moduleName => {
            this.setFieldsValue(moduleName, object[moduleName]);
        });
    }

    resetFields() {
        Object.keys(this.model).forEach(modelName => {
            this.setValueClearStatus(this.model[modelName], modelName, null);
        });
    }

    getFieldModel(name) {
        const model = this.model[name];
        return model || {};
    }

    /* 获取表单数据层的值 */
    getFieldsValue() {
        const formData = {};
        Object.keys(this.model).forEach(modelName => {
            formData[modelName] = this.model[modelName].value;
        });
        return formData;
    }

    getFieldValue(name) {
        const model = this.model[name];
        if (!model && this.defaultFormValue[name])
            return this.defaultFormValue[
                name
            ]; /* 没有注册，但是存在默认值的情况 */
        return model ? model.value : null;
    }

    validateFieldValue(name, forceUpdate = false) {
        const model = this.model[name];
        /* 记录上次状态 */
        const lastStatus = model.status;
        if (!model) return null;
        const { required, rule, value } = model;
        let status = 'resolve';
        if (required && !value) {
            status = 'reject';
        } else if (isReg(rule)) {
            /* 正则校验规则 */
            status = rule.test(value) ? 'resolve' : 'reject';
        } else if (typeof rule === 'function') {
            /* 自定义校验规则 */
            status = rule(value) ? 'resolve' : 'reject';
        }
        model.status = status;
        if (lastStatus !== status || forceUpdate) {
            const notify = this.notifyChange.bind(this, name);
            this.penddingValidateQueue.push(notify);
        }
        this.scheduleValidate();
        return status;
    }

    scheduleValidate() {
        if (this.isSchedule) {
            return;
        }

        this.isSchedule = true;
        Promise.resolve().then(() => {
            unstable_batchedUpdates(() => {
                do {
                    const notify = this.penddingValidateQueue.shift();
                    notify && notify();
                } while (this.penddingValidateQueue.length > 0);

                this.isSchedule = false;
            });
        });
    }

    /* 表单整体验证 */
    validateFields(callback) {
        let status = true;
        Object.keys(this.model).forEach(modelName => {
            const modelStates = this.validateFieldValue(modelName, true);
            if (modelStates === 'reject') status = false;
        });
        callback(status);
    }

    submit(cb) {
        this.validateFields(res => {
            const { onFinish, onFinishFailed } = this.callback;
            cb && cb(res);
            if (!res)
                onFinishFailed &&
                    typeof onFinishFailed === 'function' &&
                    onFinishFailed(); /* 验证失败 */
            onFinish &&
                typeof onFinish === 'function' &&
                onFinish(this.getFieldsValue()); /* 验证成功 */
        });
    }
}

export default FormStore;
