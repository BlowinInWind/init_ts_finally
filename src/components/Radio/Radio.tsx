/* eslint-disable react/require-default-props */
import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import RadioGroup, { GroupContext } from './RadioGroup';
import './index.scss';

interface RadioProps {
    checked?: boolean;
    label?: string;
    onChange?(...e): void;
    className?: string;
    disabled?: boolean;
    value?: number | string;
    style?: React.CSSProperties;
}

const Radio: React.FC<RadioProps> & { Group?: typeof RadioGroup } = ({
    checked,
    label,
    onChange,
    style,
    className,
    children,
    value,
    disabled
}) => {
    const [inchecked, setInChecked] = useState(checked);
    const context = useContext(GroupContext);

    useEffect(() => {
        setInChecked(checked);
    }, [checked]);

    useEffect(() => {
        if (context && value) {
            setInChecked(
                context === (typeof value === 'number' ? String(value) : value)
            );
        }
    }, [context]);

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
                radio: true,
                disabled,
                checked: inchecked,
                className
            })}
            style={{ ...style }}
        >
            <span className="radio_input">
                <span className="radio_inner"></span>
                <input
                    checked={inchecked}
                    disabled={disabled}
                    onChange={onChangeInner}
                    type="radio"
                />
            </span>
            <span className="radio_label">{children || label}</span>
        </label>
    );
};

export default Radio;
