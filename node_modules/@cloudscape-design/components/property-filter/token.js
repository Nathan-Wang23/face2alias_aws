// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import styles from './styles.css.js';
import { TokenEditor } from './token-editor';
import FilteringToken from '../internal/components/filtering-token';
import { getFormattedToken } from './utils';
export const TokenButton = ({ token, operation = 'and', first, removeToken, setToken, setOperation, filteringOptions, filteringProperties, asyncProps, onLoadItems, i18nStrings, asyncProperties, hideOperations, customGroupsText, disabled, disableFreeTextFiltering, expandToViewport, }) => {
    var _a, _b, _c;
    const formattedToken = getFormattedToken(filteringProperties, token);
    return (React.createElement(FilteringToken, { ariaLabel: formattedToken.label, showOperation: !first && !hideOperations, operation: operation, andText: (_a = i18nStrings.operationAndText) !== null && _a !== void 0 ? _a : '', orText: (_b = i18nStrings.operationOrText) !== null && _b !== void 0 ? _b : '', dismissAriaLabel: (_c = i18nStrings === null || i18nStrings === void 0 ? void 0 : i18nStrings.removeTokenButtonAriaLabel) === null || _c === void 0 ? void 0 : _c.call(i18nStrings, token), operatorAriaLabel: i18nStrings.tokenOperatorAriaLabel, onChange: setOperation, onDismiss: removeToken, disabled: disabled },
        React.createElement(TokenEditor, { setToken: setToken, triggerComponent: React.createElement("span", { className: styles['token-trigger'] },
                React.createElement(TokenTrigger, { property: formattedToken.property, operator: token.operator, value: formattedToken.value })), filteringOptions: filteringOptions, filteringProperties: filteringProperties, token: token, asyncProps: asyncProps, onLoadItems: onLoadItems, i18nStrings: i18nStrings, asyncProperties: asyncProperties, customGroupsText: customGroupsText, disableFreeTextFiltering: disableFreeTextFiltering, expandToViewport: expandToViewport })));
};
const TokenTrigger = ({ property, operator, value, }) => {
    if (property) {
        property += ' ';
    }
    const freeTextContainsToken = operator === ':' && !property;
    const operatorText = freeTextContainsToken ? '' : operator + ' ';
    return (React.createElement(React.Fragment, null,
        property,
        React.createElement("span", { className: styles['token-operator'] }, operatorText),
        value));
};
//# sourceMappingURL=token.js.map