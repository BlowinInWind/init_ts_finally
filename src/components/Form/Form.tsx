import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import FormStore from './FormStore';
import FormContext from './FormContext';

export function useForm(form, defaultFormValue = {}) {
    const formRef = React.useRef(null);
    const [, forceUpdate] = React.useState({});
    if (!formRef.current) {
        if (form) {
            formRef.current = form; /* 如果已经有 form，那么复用当前 form  */
        } else {
            /* 没有 form 创建一个 form */
            const formStoreCurrent = new FormStore(
                forceUpdate,
                defaultFormValue
            );
            /* 获取实例方法 */
            formRef.current = formStoreCurrent.getForm();
        }
    }
    return formRef.current;
}

function Form(
    { form, onFinish, onFinishFailed, initialValues, children },
    ref
) {
    /* 创建 form 状态管理实例 */
    const formInstance = useForm(form, initialValues);
    /* 抽离属性 -> 抽离 dispatch ｜ setCallback 这两个方法不能对外提供。  */
    const { setCallback, dispatch, ...providerFormInstance } = formInstance;

    /* 向 form 中注册回调函数 */
    setCallback({
        onFinish,
        onFinishFailed
    });

    /* Form 能够被 ref 标记，并操作实例。 */
    useImperativeHandle(ref, () => providerFormInstance, []);

    const RenderChildren = (
        <FormContext.Provider value={formInstance}>
            {children}
        </FormContext.Provider>
    );

    return (
        <form
            onReset={e => {
                e.preventDefault();
                e.stopPropagation();
                formInstance.resetFields();
            }}
            onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();
                formInstance.submit();
            }}
        >
            {RenderChildren}
        </form>
    );
}

export default forwardRef(Form);
