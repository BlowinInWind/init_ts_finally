/* eslint-disable array-callback-return */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import Radio from './Radio';

interface OptionsProps {
    label: string;
    value: number | string;
    disabled?: boolean;
}

export interface RadioGroupProps {
    options?: OptionsProps[] | string[];
    onChange?(...args): void;
    value?: string | number;
    children?: any;
}

export const GroupContext = React.createContext(null);

const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    children,
    onChange,
    value
}) => {
    const [selectValue, setSelectValue] = useState(value);

    const onChangeInner = v => {
        if (onChange) {
            onChange(v);
        }
    };

    useEffect(() => {
        setSelectValue(value);
    }, [value]);

    return (
        <div className="Radio_group">
            <GroupContext.Provider value={selectValue}>
                {options
                    ? options.map((item: OptionsProps | string) => {
                          if (typeof item === 'object') {
                              return (
                                  <Radio
                                      checked={selectValue === item.value}
                                      disabled={item.disabled}
                                      label={item.label}
                                      onChange={() => {
                                          onChangeInner(item.value);
                                      }}
                                  ></Radio>
                              );
                          }
                          return (
                              <Radio
                                  key={item}
                                  checked={selectValue === item}
                                  label={item}
                                  onChange={() => {
                                      onChangeInner(item);
                                  }}
                              ></Radio>
                          );
                      })
                    : React.Children.map(
                          children,
                          (
                              child: React.ReactElement<
                                  any,
                                  string | React.JSXElementConstructor<any>
                              >,
                              index
                          ) => {
                              return React.cloneElement(child, {
                                  ...child.props,
                                  key: index,
                                  onChange: e => {
                                      onChangeInner(e.target.value);
                                      if (child.props.onChange) {
                                          child.props.onChange(e);
                                      }
                                  }
                              });
                          }
                      )}
            </GroupContext.Provider>
        </div>
    );
};

export default RadioGroup;
