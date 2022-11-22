/* eslint-disable react/no-access-state-in-setstate */
import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { connect } from 'react-redux';

class Index extends React.Component {
    state = { number: 0 };

    handerClick = value => {
        this.setState({ number: this.state.number + 1 });
        this.setState({ number: this.state.number + 1 });
        setTimeout(() => {
            unstable_batchedUpdates(() => {
                this.setState({ number: 3 });
                // console.log(this.state.number); // 2
                this.setState({ number: 4 });
                // console.log(this.state.number); // 3
            });
        });
    };

    handerChange = value => {
        // console.log(value);
    };

    render() {
        // console.log(this.state.number); // 3

        return (
            <div>
                <input onChange={this.handerChange} placeholder="请输入内容" />

                <button onClick={this.handerClick}> 按钮点击 </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch({ type: 'INCREMENT' }),
        decrement: () => dispatch({ type: 'DECREMENT' }),
        reset: () => dispatch({ type: 'RESET' })
    };
};

// function Index() {
//     const [number, setNumber] = useState(0);
//     const handerClick = () => {
//         //    setNumber(1)
//         //    setNumber(2)
//         //    setNumber(3)
//         setNumber(state => state + 1);
//         // 获取上次 state = 1
//         setNumber(state => state + 1);
//         // 获取上次 state = 2
//         setNumber(state => state + 1);
//     };
//     console.log(number); // 3
//     return (
//         <div>
//             <div>{number}</div>
//             <button onClick={() => handerClick()}>点击</button>
//         </div>
//     );
// }

export default connect(mapStateToProps, mapDispatchToProps)(Index);

// export default () => {
//     const [state, setstate] = useState(0);
//     const params = useParams();

//     return (
//         <div>
//             {state}
//             <div>
//                 <button
//                     onClick={() => {
//                         setstate(state + 1);
//                     }}
//                 >
//                     button
//                 </button>
//             </div>
//         </div>
//     );
// };
