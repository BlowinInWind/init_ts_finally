/** @format */

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationName =
    | 'zoom-in-top'
    | 'zoom-in-left'
    | 'zoom-in-bottom'
    | 'zoom-in-right';

type TransitionProps = {
    animation?: AnimationName;
    wrapper?: boolean;
} & CSSTransitionProps;

const Transitions: React.FC<TransitionProps> = props => {
    const { children, classNames, animation, wrapper, ...restProps } = props;
    return (
        <CSSTransition classNames={classNames || animation} {...restProps}>
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    );
};

Transitions.defaultProps = {
    appear: true,
    unmountOnExit: true
};

export default Transitions;
