// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { findUpUntil } from './utils/dom';
export const isMotionDisabled = (element) => {
    var _a, _b;
    return !!findUpUntil(element, node => node.classList.contains('awsui-motion-disabled')) ||
        ((_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, '(prefers-reduced-motion: reduce)').matches) !== null && _b !== void 0 ? _b : false);
};
//# sourceMappingURL=motion.js.map