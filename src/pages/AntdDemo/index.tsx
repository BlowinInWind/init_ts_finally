import React, { useState } from 'react';
import { Form, Select, Button } from 'antd';

export default () => {
    const [form] = Form.useForm();

    return (
        <div>
            {/* <SetState></SetState> */}

            <Form form={form}>
                <Form.Item label="1" name={['a', 'b']}>
                    <Select>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="2" name={['a', 'c']}>
                    <Select>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                    </Select>
                </Form.Item>

                <Button
                    onClick={() => {
                        form.validateFields().then(res => {
                            // todo
                        });
                    }}
                >
                    1111
                </Button>
            </Form>
        </div>
    );
};
