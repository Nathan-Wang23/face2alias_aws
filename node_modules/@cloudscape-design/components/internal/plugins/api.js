// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { DrawersController } from './drawers-controller';
const storageKey = Symbol.for('awsui-plugin-api');
function findUpApi(currentWindow) {
    try {
        if (currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow[storageKey]) {
            return currentWindow[storageKey];
        }
        if (!currentWindow || currentWindow.parent === currentWindow) {
            // When the window has no more parents, it references itself
            return undefined;
        }
        return findUpApi(currentWindow.parent);
    }
    catch (ex) {
        // Most likely a cross-origin access error
        return undefined;
    }
}
function loadApi() {
    if (typeof window === 'undefined') {
        return createApi();
    }
    const win = window;
    const api = findUpApi(win);
    if (api) {
        return api;
    }
    win[storageKey] = createApi();
    return win[storageKey];
}
export const { awsuiPlugins, awsuiPluginsInternal } = loadApi();
function createApi() {
    const drawers = new DrawersController();
    return {
        awsuiPlugins: {
            appLayout: {
                registerDrawer: drawers.registerDrawer,
            },
        },
        awsuiPluginsInternal: {
            appLayout: {
                clearRegisteredDrawers: drawers.clearRegisteredDrawers,
                onDrawersRegistered: drawers.onDrawersRegistered,
            },
        },
    };
}
//# sourceMappingURL=api.js.map