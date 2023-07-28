import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import useBaseComponent from '../internal/hooks/use-base-component';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import InternalLink from './internal';
const Link = React.forwardRef((_a, ref) => {
    var { variant = 'secondary', fontSize = 'body-m', color = 'normal', external = false } = _a, props = __rest(_a, ["variant", "fontSize", "color", "external"]);
    const baseComponentProps = useBaseComponent('Link');
    return (React.createElement(InternalLink, Object.assign({ variant: variant, fontSize: fontSize, color: color, external: external }, props, baseComponentProps, { ref: ref })));
});
applyDisplayName(Link, 'Link');
export default Link;
//# sourceMappingURL=index.js.map