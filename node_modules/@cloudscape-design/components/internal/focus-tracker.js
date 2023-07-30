// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { containsOrEqual } from './utils/dom';
export default class FocusTracker {
    constructor(node, { onFocusEnter, onFocusLeave }, viewportId = '') {
        this.node = node;
        this.currentlyFocused = false;
        this.focusInListener = (event) => {
            const focusIsInside = containsOrEqual(this.node, event.target);
            if (!this.currentlyFocused && focusIsInside) {
                this.triggerFocus();
            }
        };
        this.focusOutListener = (event) => {
            const nextFocused = event.relatedTarget;
            let isNextFocusedInParent = !containsOrEqual(this.node, nextFocused);
            if (this.viewportId) {
                const viewport = document.getElementById(this.viewportId);
                isNextFocusedInParent = isNextFocusedInParent && !containsOrEqual(viewport, nextFocused);
            }
            if (this.currentlyFocused && (nextFocused === null || isNextFocusedInParent)) {
                this.triggerBlur();
            }
        };
        this.onFocusEnter = onFocusEnter;
        this.onFocusLeave = onFocusLeave;
        this.viewportId = viewportId;
    }
    initialize() {
        this.currentlyFocused = containsOrEqual(this.node, document.activeElement);
        document.addEventListener('focusin', this.focusInListener);
        document.addEventListener('focusout', this.focusOutListener);
    }
    destroy() {
        document.removeEventListener('focusin', this.focusInListener);
        document.removeEventListener('focusout', this.focusOutListener);
    }
    triggerBlur() {
        this.currentlyFocused = false;
        this.onFocusLeave();
    }
    triggerFocus() {
        this.currentlyFocused = true;
        this.onFocusEnter();
    }
}
//# sourceMappingURL=focus-tracker.js.map