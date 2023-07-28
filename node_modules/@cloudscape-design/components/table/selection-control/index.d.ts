import { KeyboardEventHandler } from 'react';
import { InteractiveComponent } from '../thead';
import { SelectionProps } from '../use-selection';
export interface SelectionControlProps extends SelectionProps {
    onShiftToggle?(shiftPressed: boolean): void;
    onFocusUp?: KeyboardEventHandler;
    onFocusDown?: KeyboardEventHandler;
    ariaLabel?: string;
    tabIndex?: -1;
    focusedComponent?: InteractiveComponent | null;
    onFocusedComponentChange?: (element: InteractiveComponent | null) => void;
}
export default function SelectionControl({ selectionType, indeterminate, onShiftToggle, onFocusUp, onFocusDown, name, ariaLabel, focusedComponent, onFocusedComponentChange, ...sharedProps }: SelectionControlProps): JSX.Element;
//# sourceMappingURL=index.d.ts.map