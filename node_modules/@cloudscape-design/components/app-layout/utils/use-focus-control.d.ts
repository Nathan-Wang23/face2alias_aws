import { RefObject } from 'react';
import { ButtonProps } from '../../button/interfaces';
export interface FocusControlRefs {
    toggle: RefObject<ButtonProps.Ref>;
    close: RefObject<ButtonProps.Ref>;
}
interface FocusControlState {
    refs: FocusControlRefs;
    setFocus: (force?: boolean) => void;
    loseFocus: () => void;
}
export declare function useFocusControl(isOpen: boolean, restoreFocus?: boolean): FocusControlState;
export {};
//# sourceMappingURL=use-focus-control.d.ts.map