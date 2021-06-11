/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import CheckboxGroup, { GroupContext } from './CheckboxGroup';
import './index.scss';

interface CheckBoxProps {
    checked?: boolean;
    label?: string;
    onChange?(...e): void;
    className?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    value?: number | string;
    style?: React.CSSProperties;
}

const Checkbox: React.FC<CheckBoxProps> & { Group?: typeof CheckboxGroup } = ({
    checked,
    label,
    onChange,
    style,
    className,
    children,
    value,
    indeterminate,
    disabled
}) => {
    const [inchecked, setInChecked] = useState(checked);
    const context = useContext(GroupContext);

    useEffect(() => {
        setInChecked(checked);
    }, [checked]);

    useEffect(() => {
        if (context && value) {
            setInChecked(context.findIndex(i => +i === value) > -1);
        }
    }, [JSON.stringify(context)]);

    const onChangeInner = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInChecked(e.target.checked);
        e.target.value = value as string;
        if (onChange) {
            onChange(e);
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
            className={classnames({
                checkbox: true,
                disabled,
                checked: inchecked,
                indeterminate,
                className
            })}
            style={{ ...style }}
        >
            <span className="checkbox_input">
                <span className="checkbox_inner"></span>
                <input
                    checked={inchecked}
                    disabled={disabled}
                    onChange={onChangeInner}
                    type="checkbox"
                />
            </span>
            <span className="checkbox_label">{children || label}</span>
        </label>
    );
};

export default Checkbox;
