declare module "@reguilded/api/lib" {
    export const modules: Array<{ exports: any, i: number, l: boolean }>;

    // Module getters
    export function findModule(filter: (module: any) => boolean): any | void;
    export function findAllModules(filter: (module: any) => boolean): Array<any>;
    export function findByProps(...props: string[]): any | void;
    export function findAllByProps(...props: string[]): Array<any>;
    export function findByString(...strings: string[]): any | void;

    // Standard, common modules
    export const React: any;
    export const ReactDOM: any;

    // Tools
    export function waitForElement(selector: string): Promise<Node | Element>;

    export function patchElementRenderer(
        selector: string,
        id: string,
        patchType: "before" | "after" | "instead",
        callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any
    ): Promise<[Node, React.Component]>;

    export function loadStyles<id>(id: id, source: any): { destroy: () => void, style: Element, css: string, id: id };
    export function getOwnerInstance(element: Element | Node): any;
}

declare module "@reguilded/api/patcher" {
    export type PatchChild = {
        caller: string;
        type: "after" | "before" | "instead";
        id: number;
        callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any;
        unpatch: () => void;
    };

    export type PatchData = {
        caller: string;
        module: any;
        functionName: string;
        originalFunction: Function;
        unpatch: () => void;
        count: number;
        children: PatchChild[];
    };

    export function getPatchesByCaller(caller: string): PatchChild[];

    export function unpatchAll(caller: string): void;

    export function makeOverride(patch: PatchData): Function;

    export function pushPatcher(caller: string, module: any, functionName: string): void;

    export function doPatch(
        caller: string,
        module: any,
        functionName: string,
        callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any,
        type: ("after" | "before" | "instead"),
        options: { force: boolean }
    ): () => void;

    export function before(caller: string, module: any, functionName: any, callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any): () => void;
    export function after(caller: string, module: any, functionName: any, callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any): () => void;
    export function instead(caller: string, module: any, functionName: any, callback: (thisObject: any, methodArguments: IArguments, returnValue: any) => any): () => void;
}

declare module "@reguilded/api/modalStack" {
    type ModalStackState = {
        stack: Array<any>;
        closing: Array<any>;
    };
    
    export default class ModalStack extends React.Component<null, ModalStackState> {
        static instance: ModalStack;
        static container: Element;
        static containerId: string;
        
        static init(): void;
        
        static push(modal: any): void;
        static pop(): Promise<void>;
        
        state: ModalStackState;
    }
}

declare module "@reguilded/api/settingsFields" {
    export function ColorField(props: {
        title: string;
        defaultValue: string;
        callback: (value: string) => void;
        key?: any;
    }): React.Component;

    export function StringField(props: {
        title: string;
        defaultValue: string;
        callback: (value: string) => void;
        key?: any;
    }): React.Component;
    
    export function NumberField(props: {
        title: string;
        defaultValue: string;
        callback: (value: string) => void;
        min?: number;
        max?: number;
        key?: any;
    }): React.Component;
}