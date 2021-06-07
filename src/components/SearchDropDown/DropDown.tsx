import React from 'react';
import classnames from 'classnames';
import Transition from '../Transition';

export interface DropDownProps {
    isOpened: boolean;
    dropdownClassName?: string;
    dropdownStyle?: React.CSSProperties;
}

const DropDown: React.FC<DropDownProps> = ({
    isOpened,
    dropdownClassName,
    dropdownStyle,
    ...props
}) => {
    const classes = classnames('dropDown-wrapper', dropdownClassName);
    return (
        <Transition animation="zoom-in-top" in={isOpened} timeout={300}>
            <div className={classes} style={{ ...dropdownStyle }}>
                {props.children}
            </div>
        </Transition>
    );
};

export default DropDown;
