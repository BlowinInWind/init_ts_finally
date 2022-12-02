/* eslint-disable array-callback-return */
/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import Checkbox from './Checkbox';

interface OptionsProps {
    label: string;
    value: number | string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    options?: OptionsProps[] | string[];
    onChange?(...args): void;
    value?: string[] | number[];
    children?: any;
}

export const GroupContext = React.createContext(null);

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    options,
    children,
    onChange,
    value = []
}) => {
    const [selectValue, setSelectValue] = useState(value);

    const onChangeInner = (v, e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = [...selectValue];
        const index = newValue.findIndex(
            (item: OptionsProps | string | number) => {
                if (typeof item === 'object') {
                    return item.value === v;
                }
                return item === v;
            }
        );

        if (e.target.checked) {
            if (index < 0) {
                newValue.push(v);
            }
        } else {
            newValue.splice(index, 1);
        }

        setSelectValue(newValue as any);

        if (onChange) {
            onChange(newValue);
        }
    };

    useEffect(() => {
        setSelectValue(value.map(i => i));
    }, [JSON.stringify(value)]);

    return (
        <div className="checkbox_group">
            <GroupContext.Provider value={selectValue}>
                {options
                    ? options.map((item: OptionsProps | string) => {
                          if (typeof item === 'object') {
                              return (
                                  <Checkbox
                                      checked={
                                          selectValue.findIndex(
                                              i => i === item.value
                                          ) >= 0
                                      }
                                      disabled={item.disabled}
                                      label={item.label}
                                      onChange={e => {
                                          onChangeInner(item.value, e);
                                      }}
                                  ></Checkbox>
                              );
                          }
                          return (
                              <Checkbox
                                  key={item}
                                  checked={
                                      selectValue.findIndex(i => i === item) >=
                                      0
                                  }
                                  label={item}
                                  onChange={e => {
                                      onChangeInner(item, e);
                                  }}
                              ></Checkbox>
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
                                      onChangeInner(e.target.value, e);
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

export default CheckboxGroup;
