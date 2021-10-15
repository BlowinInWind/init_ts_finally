/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, useRef } from 'react';

import { Observable, Subject, fromEvent, range } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// const observable = Observable.create(function (observer) {
//     observer.next(1);
//     observer.next(2);

//     observer.next(3);
//     setTimeout(() => {
//         observer.next(4);
//         observer.complete();
//     }, 1000);
// });

// console.log('just before subscribe');
// observable.subscribe({
//     next: x => console.log(`got value ${x}`),
//     error: err => console.error(`something wrong occurred: ${err}`),
//     complete: () => console.log('done')
// });
// console.log('just after subscribe');

// const subject = new Subject();

// const observerA = {
//     next: value => console.log(`A next: ${value}`),
//     error: error => console.log(`A error: ${error}`),
//     complete: () => console.log('A complete!')
// };

// subject.subscribe(observerA);
// subject.next(1);

// range(1, 200)
//     .pipe(
//         filter(x => x % 2 === 1),
//         map(x => x + x)
//     )
//     .subscribe(x => console.log(x));

export default () => {
    const [state, setstate] = useState(0);
    const ref = useRef();

    useEffect(() => {
        console.log(state);

        return () => {
            console.log('return 1111');
        };
    }, [state]);

    // useEffect(() => {
    //     console.log('1111');

    //     return () => {
    //         console.log('return 2222');
    //     };
    // }, [state]);

    return (
        <div>
            {state}
            <div>
                <button
                    ref={ref}
                    onClick={() => {
                        setstate(v => {
                            // setstate(n => n + 10);
                            return v + 1;
                        });
                    }}
                >
                    button
                </button>
            </div>
        </div>
    );
};
