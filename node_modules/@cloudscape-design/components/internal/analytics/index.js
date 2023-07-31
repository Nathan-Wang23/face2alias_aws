// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/* istanbul ignore file */
export function setFunnelMetrics(funnelMetrics) {
    FunnelMetrics = funnelMetrics;
}
/**
 * This is a stub implementation of the FunnelMetrics interface and will be replaced during
 * build time with the actual implementation.
 */
export let FunnelMetrics = {
    funnelStart() {
        return '';
    },
    funnelError() { },
    funnelComplete() { },
    funnelSuccessful() { },
    funnelCancelled() { },
    funnelStepStart() { },
    funnelStepComplete() { },
    funnelStepNavigation() { },
    funnelSubStepStart() { },
    funnelSubStepComplete() { },
    funnelSubStepError() { },
    helpPanelInteracted() { },
    externalLinkInteracted() { },
};
//# sourceMappingURL=index.js.map