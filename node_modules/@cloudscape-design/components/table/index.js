import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalTable from './internal';
import useBaseComponent from '../internal/hooks/use-base-component';
const Table = React.forwardRef((_a, ref) => {
    var { items = [], selectedItems = [], variant = 'container', contentDensity = 'comfortable' } = _a, props = __rest(_a, ["items", "selectedItems", "variant", "contentDensity"]);
    const baseComponentProps = useBaseComponent('Table');
    return (React.createElement(InternalTable, Object.assign({ items: items, selectedItems: selectedItems, variant: variant, contentDensity: contentDensity }, props, baseComponentProps, { ref: ref })));
});
applyDisplayName(Table, 'Table');
export default Table;
//# sourceMappingURL=index.js.map