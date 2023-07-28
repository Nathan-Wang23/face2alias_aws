// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useRef } from 'react';
export function useFocusControl(isOpen, restoreFocus = false) {
    const refs = {
        toggle: useRef(null),
        close: useRef(null),
    };
    const previousFocusedElement = useRef();
    const shouldFocus = useRef(false);
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
    };
}
//# sourceMappingURL=use-focus-control.js.map