import { KeyboardEvent } from 'react';
import { TableProps } from './interfaces';
export interface SelectionProps {
    name: string;
    disabled: boolean;
    selectionType: 'single' | 'multi';
    indeterminate?: boolean;
    checked: boolean;
    onChange: () => void;
    ariaLabel?: string;
}
export declare function useFocusMove(selectionType: TableProps['selectionType'], totalItems: number): {
    moveFocusDown?: undefined;
    moveFocusUp?: undefined;
    moveFocus?: undefined;
} | {
    moveFocusDown: (event: KeyboardEvent) => void;
    moveFocusUp: (event: KeyboardEvent) => void;
    moveFocus: (sourceElement: HTMLElement, fromIndex: number, direction: -1 | 1) => void;
};
export declare const focusMarkers: {
    item: {
        [x: string]: string;
    };
    all: {
        [x: string]: string;
    };
    root: {
        [x: string]: string;
    };
};
export declare function useSelection<T>({ items, selectedItems, selectionType, isItemDisabled, trackBy, onSelectionChange, ariaLabels, loading, }: Pick<TableProps<T>, 'ariaLabels' | 'items' | 'selectedItems' | 'selectionType' | 'isItemDisabled' | 'trackBy' | 'onSelectionChange' | 'loading'>): {
    isItemSelected: (item: T) => boolean;
    getSelectAllProps: () => SelectionProps;
    getItemSelectionProps: (item: T) => SelectionProps;
    updateShiftToggle: (value: boolean) => void;
};
//# sourceMappingURL=use-selection.d.ts.map