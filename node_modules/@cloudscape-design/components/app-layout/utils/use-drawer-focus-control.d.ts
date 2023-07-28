import { DependencyList, RefObject } from 'react';
import { ButtonProps } from '../../button/interfaces';
export type DrawerLastInteraction = {
    type: 'open';
} | {
    type: 'close';
};
export interface DrawerFocusControlRefs {
    toggle: RefObject<ButtonProps.Ref>;
    close: RefObject<ButtonProps.Ref>;
    slider: RefObject<HTMLDivElement>;
}
interface FocusControlState {
    refs: DrawerFocusControlRefs;
    setFocus: (force?: boolean) => void;
    loseFocus: () => void;
    setLastInteraction: (interaction: DrawerLastInteraction) => void;
}
export declare function useDrawerFocusControl(dependencies: DependencyList, isOpen: boolean, restoreFocus?: boolean): FocusControlState;
export {};
//# sourceMappingURL=use-drawer-focus-control.d.ts.map