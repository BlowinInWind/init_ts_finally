/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import { Input } from 'antd';
import classnames from 'classnames';
// import { useDebounce, useOnClickOutside } from 'baili_hooks';
import DropDown from './DropDown';
import './index.scss';

interface SearchDropDownInterface {
    requestUrl: string;
    classes?: string;
    render?(data: any): JSX.Element;
}

const SearchDropDown: React.FC<SearchDropDownInterface> = ({
    requestUrl,
    classes,
    render
}) => {
    const classNames = classnames(classes, 'default_search_wrapper');
    // const ref = useRef();
    // useOnClickOutside(ref, () => setIsOpened(false));

    // const [isOpened, setIsOpened] = useState(false);
    // const onInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //     setIsOpened(true);
    // };

    // 防抖
    // const { run } = useDebounce(onInputChange, 500);

    return (
        <div className={classNames}>
            {/* <Input onChange={run}></Input>
            <DropDown isOpened={isOpened}>
                <div>
                    {render
                        ? typeof render === 'function'
                            ? render({ name: 1 })
                            : null
                        : null}
                </div>
            </DropDown> */}
        </div>
    );
};

export default SearchDropDown;
