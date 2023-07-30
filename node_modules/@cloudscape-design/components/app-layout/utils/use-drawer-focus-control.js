// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef, useCallback } from 'react';
export function useDrawerFocusControl(dependencies, isOpen, restoreFocus = false) {
    const refs = {
        toggle: useRef(null),
        close: useRef(null),
        slider: useRef(null),
    };
    const previousFocusedElement = useRef();
    const shouldFocus = useRef(false);
    const lastInteraction = useRef(null);
    useEffect(() => {
        var _a, _b, _c, _d;
        switch ((_a = lastInteraction.current) === null || _a === void 0 ? void 0 : _a.type) {
            case 'open':
                if (refs.slider.current) {
                    (_b = refs.slider.current) === null || _b === void 0 ? void 0 : _b.focus();
                }
                else {
                    (_c = refs.close.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
                break;
            case 'close':
                (_d = refs.toggle.current) === null || _d === void 0 ? void 0 : _d.focus();
                break;
        }
        lastInteraction.current = null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
    const doFocus = () => {
        var _a, _b;
        if (!shouldFocus.current) {
            return;
        }
        if (isOpen) {
            previousFocusedElement.current =
                document.activeElement !== document.body ? document.activeElement : undefined;
            (_a = refs.close.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else {
            if (restoreFocus && previousFocusedElement.current && document.contains(previousFocusedElement.current)) {
                previousFocusedElement.current.focus();
                previousFocusedElement.current = undefined;
            }
            else {
                (_b = refs.toggle.current) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }
        shouldFocus.current = false;
    };
    // We explictly want this effect to run when only `isOpen` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(doFocus, [isOpen]);
    const loseFocus = useCallback(() => {
        previousFocusedElement.current = undefined;
    }, []);
    return {
        refs,
        setFocus: force => {
            shouldFocus.current = true;
            if (force && isOpen) {
                doFocus();
            }
        },
        loseFocus,
        setLastInteraction: (interaction) => (lastInteraction.current = interaction),
    };
}
//# sourceMappingURL=use-drawer-focus-control.js.map