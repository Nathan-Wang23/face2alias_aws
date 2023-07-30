/// <reference types="react" />
interface ResizerProps {
    onDragMove: (newWidth: number) => void;
    onFinish: () => void;
    ariaLabelledby?: string;
    minWidth?: number;
    tabIndex?: number;
    showFocusRing?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare function Resizer({ onDragMove, onFinish, ariaLabelledby, minWidth, tabIndex, showFocusRing, onFocus, onBlur, }: ResizerProps): JSX.Element;
export declare function ResizeTracker(): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map