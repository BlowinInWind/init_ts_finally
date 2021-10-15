import React, {
    useRef,
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export default class Mode extends React.Component<
    { [x: string]: any },
    { num: number }
> {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        };
    }

    componentDidMount() {
        // this.setState({ num: this.state.num + 1 });
        // console.log(this.state.num);

        // this.setState({ num: this.state.num + 1 });
        // console.log(this.state.num);

        // setTimeout(() => {
        //     unstable_batchedUpdates(() => {
        //         this.setState({ num: this.state.num + 1 });
        //         console.log(this.state.num);
        //         this.setState({ num: this.state.num + 1 });
        //         console.log(this.state.num);
        //     });
        // }, 0);

        this.setState({ num: 1 });
        this.setState({ num: 2 });
        this.setState({ num: 3 });

        setTimeout(() => {
            unstable_batchedUpdates(() => {
                this.setState({ num: 4 });
                this.setState({ num: 5 });
                this.setState({ num: 6 });
            });
        }, 0);
    }

    render() {
        return <div>{this.state.num}</div>;
    }
}
