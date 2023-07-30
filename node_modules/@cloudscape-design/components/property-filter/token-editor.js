// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState, useRef } from 'react';
import InternalSelect from '../select/internal';
import InternalAutosuggest from '../autosuggest/internal';
import InternalPopover from '../popover/internal';
import styles from './styles.css.js';
import { useLoadItems } from './use-load-items';
import { createPropertiesCompatibilityMap, getAllowedOperators, getPropertyOptions, operatorToDescription, getPropertySuggestions, } from './controller';
import InternalButton from '../button/internal';
import InternalFormField from '../form-field/internal';
import { getPropertyByKey, matchTokenValue } from './utils';
const freeTextOperators = [':', '!:'];
function PropertyInput({ propertyKey, onChangePropertyKey, asyncProps, filteringProperties, onLoadItems, customGroupsText, i18nStrings, disableFreeTextFiltering, }) {
    const property = propertyKey !== undefined ? getPropertyByKey(filteringProperties, propertyKey) : undefined;
    const propertySelectHandlers = useLoadItems(onLoadItems);
    const asyncPropertySelectProps = asyncProps ? Object.assign(Object.assign({}, asyncProps), propertySelectHandlers) : {};
    const propertyOptions = getPropertySuggestions(filteringProperties, customGroupsText, i18nStrings, ({ propertyKey, propertyLabel }) => ({
        value: propertyKey,
        label: propertyLabel,
        dontCloseOnSelect: true,
    }));
    // Disallow selecting properties that have different representation.
    const checkPropertiesCompatible = createPropertiesCompatibilityMap(filteringProperties);
    propertyOptions.forEach(optionGroup => {
        if ('options' in optionGroup) {
            optionGroup.options.forEach(option => {
                if (propertyKey && option.value) {
                    option.disabled = !checkPropertiesCompatible(option.value, propertyKey);
                }
            });
        }
    });
    const allPropertiesOption = {
        label: i18nStrings.allPropertiesLabel,
        value: undefined,
    };
    if (!disableFreeTextFiltering) {
        propertyOptions.unshift(allPropertiesOption);
    }
    return (React.createElement(InternalSelect, Object.assign({ options: propertyOptions, selectedOption: property
            ? {
                value: propertyKey !== null && propertyKey !== void 0 ? propertyKey : undefined,
                label: property.propertyLabel,
            }
            : allPropertiesOption, onChange: e => onChangePropertyKey(e.detail.selectedOption.value) }, asyncPropertySelectProps)));
}
function OperatorInput({ propertyKey, operator, onChangeOperator, filteringProperties, i18nStrings, }) {
    const property = propertyKey !== undefined ? getPropertyByKey(filteringProperties, propertyKey) : undefined;
    const freeTextOperators = [':', '!:'];
    const operatorOptions = (property ? getAllowedOperators(property) : freeTextOperators).map(operator => ({
        value: operator,
        label: operator,
        description: operatorToDescription(operator, i18nStrings),
    }));
    return (React.createElement(InternalSelect, { options: operatorOptions, triggerVariant: "option", selectedOption: operator
            ? {
                value: operator,
                label: operator,
                description: operatorToDescription(operator, i18nStrings),
            }
            : null, onChange: e => onChangeOperator(e.detail.selectedOption.value) }));
}
function ValueInput({ propertyKey, operator, value, onChangeValue, asyncProps, filteringProperties, filteringOptions, onLoadItems, i18nStrings, }) {
    var _a, _b, _c;
    const property = propertyKey !== undefined ? getPropertyByKey(filteringProperties, propertyKey) : undefined;
    const valueOptions = property
        ? getPropertyOptions(property, filteringOptions).map(({ label, value }) => ({ label, value }))
        : [];
    const valueAutosuggestHandlers = useLoadItems(onLoadItems, '', property === null || property === void 0 ? void 0 : property.externalProperty);
    const asyncValueAutosuggestProps = propertyKey
        ? Object.assign(Object.assign({}, valueAutosuggestHandlers), asyncProps) : { empty: asyncProps.empty };
    const [matchedOption] = valueOptions.filter(option => option.value === value);
    const OperatorForm = propertyKey && operator && (property === null || property === void 0 ? void 0 : property.getValueFormRenderer(operator));
    return OperatorForm ? (React.createElement(OperatorForm, { value: value, onChange: onChangeValue, operator: operator })) : (React.createElement(InternalAutosuggest, Object.assign({ enteredTextLabel: (_a = i18nStrings.enteredTextLabel) !== null && _a !== void 0 ? _a : (value => value), value: (_c = (_b = matchedOption === null || matchedOption === void 0 ? void 0 : matchedOption.label) !== null && _b !== void 0 ? _b : value) !== null && _c !== void 0 ? _c : '', clearAriaLabel: i18nStrings.clearAriaLabel, onChange: e => onChangeValue(e.detail.value), disabled: !operator, options: valueOptions }, asyncValueAutosuggestProps, { virtualScroll: true })));
}
export function TokenEditor({ asyncProperties, asyncProps, customGroupsText, disableFreeTextFiltering, expandToViewport, filteringOptions, filteringProperties, i18nStrings, onLoadItems, setToken, token, triggerComponent, }) {
    const [temporaryToken, setTemporaryToken] = useState(token);
    const popoverRef = useRef(null);
    const closePopover = () => {
        popoverRef.current && popoverRef.current.dismissPopover();
    };
    const propertyKey = temporaryToken.propertyKey;
    const onChangePropertyKey = (newPropertyKey) => {
        const filteringProperty = filteringProperties.reduce((acc, property) => (property.propertyKey === newPropertyKey ? property : acc), undefined);
        const allowedOperators = filteringProperty ? getAllowedOperators(filteringProperty) : freeTextOperators;
        const operator = temporaryToken.operator && allowedOperators.indexOf(temporaryToken.operator) !== -1
            ? temporaryToken.operator
            : allowedOperators[0];
        setTemporaryToken(Object.assign(Object.assign({}, temporaryToken), { propertyKey: newPropertyKey, operator }));
    };
    const operator = temporaryToken.operator;
    const onChangeOperator = (newOperator) => {
        setTemporaryToken(Object.assign(Object.assign({}, temporaryToken), { operator: newOperator }));
    };
    const value = temporaryToken.value;
    const onChangeValue = (newValue) => {
        setTemporaryToken(Object.assign(Object.assign({}, temporaryToken), { value: newValue }));
    };
    return (React.createElement(InternalPopover, { ref: popoverRef, className: styles['token-label'], triggerType: "text", header: i18nStrings.editTokenHeader, size: "large", position: "right", dismissAriaLabel: i18nStrings.dismissAriaLabel, __onOpen: () => setTemporaryToken(token), renderWithPortal: expandToViewport, content: React.createElement("div", { className: styles['token-editor'] },
            React.createElement("div", { className: styles['token-editor-form'] },
                React.createElement(InternalFormField, { label: i18nStrings.propertyText, className: styles['token-editor-field-property'] },
                    React.createElement(PropertyInput, { propertyKey: propertyKey, onChangePropertyKey: onChangePropertyKey, asyncProps: asyncProperties ? asyncProps : null, filteringProperties: filteringProperties, onLoadItems: onLoadItems, customGroupsText: customGroupsText, i18nStrings: i18nStrings, disableFreeTextFiltering: disableFreeTextFiltering })),
                React.createElement(InternalFormField, { label: i18nStrings.operatorText, className: styles['token-editor-field-operator'] },
                    React.createElement(OperatorInput, { propertyKey: propertyKey, operator: operator, onChangeOperator: onChangeOperator, filteringProperties: filteringProperties, i18nStrings: i18nStrings })),
                React.createElement(InternalFormField, { label: i18nStrings.valueText, className: styles['token-editor-field-value'] },
                    React.createElement(ValueInput, { propertyKey: propertyKey, operator: operator, value: value, onChangeValue: onChangeValue, asyncProps: asyncProps, filteringProperties: filteringProperties, filteringOptions: filteringOptions, onLoadItems: onLoadItems, i18nStrings: i18nStrings }))),
            React.createElement("div", { className: styles['token-editor-actions'] },
                React.createElement(InternalButton, { formAction: "none", variant: "link", className: styles['token-editor-cancel'], onClick: closePopover }, i18nStrings.cancelActionText),
                React.createElement(InternalButton, { className: styles['token-editor-submit'], formAction: "none", onClick: () => {
                        setToken(matchTokenValue(temporaryToken, filteringOptions));
                        closePopover();
                    } }, i18nStrings.applyActionText))) }, triggerComponent));
}
//# sourceMappingURL=token-editor.js.map