/* eslint-disable no-plusplus */
import { unstable_batchedUpdates } from 'react-dom';

class ReduxHooksStore {
    private name: string;

    private id: number;

    private reducer: any;

    private state: any;

    private mapConnects: Record<string, any>;

    constructor(reducer, initState) {
        this.name = '__ReduxHooksStore__';
        this.id = 0;
        this.reducer = reducer;
        this.state = initState;
        this.mapConnects = {};
    }

    exportStore = () => {
        return {
            dispatch: this.dispatch.bind(this),
            subscribe: this.subscribe.bind(this),
            unSubscribe: this.unSubscribe.bind(this),
            getInitState: this.getInitState.bind(this)
        };
    };

    /* 更新需要更新的组件 */
    publicRender = () => {
        unstable_batchedUpdates(() => {
            Object.keys(this.mapConnects).forEach(name => {
                const { update } = this.mapConnects[name];
                update(this.state);
            });
        });
    };

    dispatch = () => {
        this.state = this.reducer(this.state.action);
        this.publicRender();
    };

    subscribe = connectCurrent => {
        const connectName = `${this.name}${++this.id}`;
        this.mapConnects[connectName] = connectCurrent;
        return connectName;
    };

    unSubscribe = connectName => {
        delete this.mapConnects[connectName];
    };

    /* 获取初始化 state */
    getInitState = mapStoreToState => {
        return mapStoreToState(this.state);
    };
}

export default ReduxHooksStore;
