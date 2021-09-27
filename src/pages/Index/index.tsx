/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

@isTestable(true)
class MyClass {
    public static istest: any;

    public name1: any;
}

function isTestable(value) {
    return function decorator(target) {
        target.istest = value;
        target.prototype.name1 = value;
    };
}

console.log(MyClass.istest);
console.log(new MyClass().name1);
// function classDecorator(constructor) {
//     constructor.name1 = '11';
//     // return class extends constructor {
//     //     newProperty = 'new property';

//     //     hello = 'override';
//     // };
// }

// @classDecorator
// class Greeter {
//     property = 'property';

//     newProperty: string;

//     hello: string;

//     public static name1: string;

//     constructor(m: string) {
//         this.hello = m;
//     }
// }
// console.log(Greeter.name1);

// console.log(new Greeter('world'));

export default () => {
    return <div>Main</div>;
};
