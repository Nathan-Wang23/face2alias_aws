// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { I18nProvider } from './provider';
export default function TestI18nProvider({ messages = {}, locale = 'en', children }) {
    return (React.createElement(I18nProvider, { locale: locale, messages: [{ '@cloudscape-design/components': { [locale]: messages } }] }, children));
}
//# sourceMappingURL=testing.js.map