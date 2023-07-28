// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { warnOnce } from '@cloudscape-design/component-toolkit/internal';
export function checkColumnWidths(columnDefinitions) {
    for (const column of columnDefinitions) {
        checkProperty(column, 'minWidth');
        checkProperty(column, 'width');
    }
}
function checkProperty(column, name) {
    const value = column[name];
    if (typeof value !== 'number' && typeof value !== 'undefined') {
        warnOnce('Table', `resizableColumns feature requires ${name} property to be a number, got ${value}. The component may work incorrectly.`);
    }
}
//# sourceMappingURL=column-widths-utils.js.map