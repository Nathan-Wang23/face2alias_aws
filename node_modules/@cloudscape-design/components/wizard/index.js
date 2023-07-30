import { __rest } from "tslib";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { getExternalProps } from '../internal/utils/external-props';
import { applyDisplayName } from '../internal/utils/apply-display-name';
import useBaseComponent from '../internal/hooks/use-base-component';
import { AnalyticsFunnel } from '../internal/analytics/components/analytics-funnel';
import InternalWizard from './internal';
function Wizard(_a) {
    var { isLoadingNextStep = false, allowSkipTo = false } = _a, props = __rest(_a, ["isLoadingNextStep", "allowSkipTo"]);
    const baseComponentProps = useBaseComponent('Wizard');
    const externalProps = getExternalProps(props);
    return (React.createElement(AnalyticsFunnel, { funnelType: "multi-page", optionalStepNumbers: props.steps.map((step, index) => (step.isOptional ? index : -1)).filter(step => step !== -1), totalFunnelSteps: props.steps.length },
        React.createElement(InternalWizard, Object.assign({ isLoadingNextStep: isLoadingNextStep, allowSkipTo: allowSkipTo }, externalProps, baseComponentProps))));
}
applyDisplayName(Wizard, 'Wizard');
export default Wizard;
//# sourceMappingURL=index.js.map