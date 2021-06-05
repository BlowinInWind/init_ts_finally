/** @format */

import React, { Component } from 'react';
import img from '@common/assets/imgs/wushuju.png';

import './index.scss';

class NoDataCom extends Component {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                className="no_block"
                style={{ height: document.body.clientHeight - 64 }}
            >
                <div>
                    <img alt="" src={img} />
                    无关联信息，无查看权限
                </div>
            </div>
        );
    }
}

export default NoDataCom;
