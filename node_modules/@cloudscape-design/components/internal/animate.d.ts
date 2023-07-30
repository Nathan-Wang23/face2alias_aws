export declare function getDOMRects(elements: Record<string | number, HTMLElement | null>): Record<string, DOMRect>;
export declare function animate({ oldState, elements, onTransitionsEnd, newElementInitialState, }: {
    elements: Record<string | number, HTMLElement | null>;
    oldState: Record<string | number, DOMRect>;
    onTransitionsEnd?: () => void;
    newElementInitialState?: (newRect: DOMRect) => {
        scale?: number;
        y?: number;
    };
}): void;
//# sourceMappingURL=animate.d.ts.map