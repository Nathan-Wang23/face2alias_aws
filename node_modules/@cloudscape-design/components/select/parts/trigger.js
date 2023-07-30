// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useMergeRefs } from '../../internal/hooks/use-merge-refs';
import clsx from 'clsx';
import ButtonTrigger from '../../internal/components/button-trigger';
import styles from './styles.css.js';
import Option from '../../internal/components/option';
import { useUniqueId } from '../../internal/hooks/use-unique-id';
import { joinStrings } from '../../internal/utils/strings';
const Trigger = React.forwardRef(({ ariaLabelledby, ariaDescribedby, controlId, invalid, triggerProps, selectedOption, triggerVariant, inFilteringToken, isOpen, placeholder, disabled, }, ref) => {
    const generatedId = useUniqueId();
    const id = controlId !== null && controlId !== void 0 ? controlId : generatedId;
    const triggerContentId = useUniqueId('trigger-content-');
    let triggerContent = null;
    if (!selectedOption) {
        triggerContent = (React.createElement("span", { "aria-disabled": "true", className: clsx(styles.placeholder, styles.trigger), id: triggerContentId }, placeholder));
    }
    else if (triggerVariant === 'option') {
        triggerContent = React.createElement(Option, { id: triggerContentId, option: Object.assign(Object.assign({}, selectedOption), { disabled }), triggerVariant: true });
    }
    else {
        triggerContent = (React.createElement("span", { id: triggerContentId, className: styles.trigger }, selectedOption.label || selectedOption.value));
    }
    const mergedRef = useMergeRefs(triggerProps.ref, ref);
    return (React.createElement(ButtonTrigger, Object.assign({}, triggerProps, { id: id, ref: mergedRef, pressed: isOpen, disabled: disabled, invalid: invalid, inFilteringToken: inFilteringToken, ariaDescribedby: ariaDescribedby, ariaLabelledby: joinStrings(ariaLabelledby, triggerContentId) }), triggerContent));
});
export default Trigger;
//# sourceMappingURL=trigger.js.map