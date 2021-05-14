/** @format */

import React, { useState } from 'react';
import { Modal, Button } from 'antd';

interface InterModal {
    initTitle: string;
    visible?: boolean;
    wrapClassName?: string;
}

export default ({ initTitle, visible = false, wrapClassName }: InterModal) => {
    const [visibleStatus, setVisible] = useState(visible);
    const [title, setTitle] = useState(initTitle);

    const show = () => {
        setVisible(true);
    };

    const hidden = () => {
        return new Promise(reslove => {
            setVisible(false);
            reslove(null);
        });
    };

    const ContentModal = props => {
        const onOkFun = () => {
            const { onOk } = props;
            if (onOk) {
                onOk();
            } else {
                hidden();
            }
        };
        const onCancelFun = () => {
            const { onCancel } = props;
            if (onCancel) {
                onCancel();
            } else {
                hidden();
            }
        };

        return (
            <>
                {visibleStatus && (
                    <Modal
                        centered
                        footer={[
                            <Button key="back" onClick={onCancelFun}>
                                取消
                            </Button>,
                            <Button key="submit" onClick={onOkFun} type="primary">
                                确认
                            </Button>
                        ]}
                        maskClosable
                        onCancel={onCancelFun}
                        onOk={onOkFun}
                        title={title}
                        visible={visibleStatus}
                        wrapClassName={wrapClassName}
                        {...props}
                    >
                        {props.children}
                    </Modal>
                )}
            </>
        );
    };

    return {
        ContentModal,
        show,
        hidden,
        setTitle
    };
};
