/** @format */

export interface ChildState {
    value: string;
}

declare namespace Myself {
    interface ChildProps {
        value?: string;
    }

    function Name(x: number): void;
}

// declare function globLib(options: globLib.Options): void;

declare namespace globLib {
    const version: number;
    function dosomething(): void;
    interface Options {
        [key: string]: string;
    }
}

// export interface ChildProps {
//     value?: string;
// }
