/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from 'react';
import './c';
// const a = require('./a.js');
// const b = require('./b.js');

// console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
// const Index = () => {
//     throw {
//         current: new Promise(resolve => {
//             setTimeout(() => {
//                 resolve({ name: '《React进阶实践指南》' });
//             }, 1000);
//         })
//     };
//     // throw Promise.resolve({ name: 1 });
//     // throw {
//     //     name: '111'
//     // };
// };

function Index({ isResolve = false, data }) {
    const [likeNumber, setLikeNumber] = useState(0);
    if (isResolve) {
        return (
            <div>
                <p> 名称：{data.name} </p>
                <p> star：{likeNumber} </p>
                <button onClick={() => setLikeNumber(likeNumber + 1)}>
                    点赞
                </button>
            </div>
        );
    }
    throw {
        current: new Promise(resolve => {
            setTimeout(() => {
                resolve({ name: '《React进阶实践指南》' });
            }, 1000);
        })
    };
}

export default class App extends React.Component {
    state = {
        isResolve: false,
        data: {}
    };

    componentDidCatch(e) {
        const errorPromise = e.current;
        Promise.resolve(errorPromise).then(res => {
            this.setState({ data: res, isResolve: true });
        });
    }

    render() {
        const { isResolve, data } = this.state;
        return (
            <div>
                hello world , let us learn React!
                <Index data={data} isResolve={isResolve} />
            </div>
        );
    }
}
// export default class Error extends React.Component {
//     state = {
//         isError: false,
//         childThrowMes: {}
//     };

//     // static getDerivedStateFromError(error) {
//     //     console.log(error);
//     //     // 更新 state 使下一次渲染能够显示降级后的 UI
//     //     return { hasError: true };
//     // }

//     componentDidCatch(e, errorInfo) {
//         const errorPromise = e.current;

//         Promise.resolve(errorPromise).then(res => {
//             this.setState({ isError: true, childThrowMes: res });
//         });
//         // this.setState({ isError: true, childThrowMes: e });
//     }

//     render() {
//         return (
//             <div>
//                 hello world , let us learn React!
//                 {!this.state.isError ? (
//                     <Index />
//                 ) : (
//                     <div> {this.state.childThrowMes.name} </div>
//                 )}
//             </div>
//         );
//     }
// }
