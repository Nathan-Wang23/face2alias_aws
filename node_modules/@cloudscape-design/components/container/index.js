import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import InternalContainer from './internal';
import { getExternalProps } from '../internal/utils/external-props';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { AnalyticsFunnelSubStep } from '../internal/analytics/components/analytics-funnel';
export default function Container(_a) {
    var { variant = 'default', disableHeaderPaddings = false, disableContentPaddings = false } = _a, props = __rest(_a, ["variant", "disableHeaderPaddings", "disableContentPaddings"]);
    const baseComponentProps = useBaseComponent('Container');
    const externalProps = getExternalProps(props);
    return (React.createElement(AnalyticsFunnelSubStep, null,
        React.createElement(InternalContainer, Object.assign({ variant: variant, disableHeaderPaddings: disableHeaderPaddings, disableContentPaddings: disableContentPaddings }, externalProps, baseComponentProps))));
}
applyDisplayName(Container, 'Container');
//# sourceMappingURL=index.js.map