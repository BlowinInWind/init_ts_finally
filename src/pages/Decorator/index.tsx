/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-multi-comp */
import React, { useRef, useEffect } from 'react';

function classDecorator<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        newProperty = 'new property';

        hello = 'override';
    };
}

@classDecorator
class Greeter {
    property = 'property';

    hello: string;

    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter('world'));

function Index() {
    return <div></div>;
}

export default Index;
