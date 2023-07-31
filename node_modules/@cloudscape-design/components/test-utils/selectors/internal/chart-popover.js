"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const selectors_1 = require("@cloudscape-design/test-utils-core/selectors");
const button_1 = require("../button");
const styles_selectors_js_1 = require("../../../internal/components/chart-popover/styles.selectors.js");
const styles_selectors_js_2 = require("../../../popover/styles.selectors.js");
class ChartPopoverWrapper extends selectors_1.ComponentWrapper {
    findHeader() {
        return this.findByClassName(styles_selectors_js_2.default.header);
    }
    findContent() {
        return this.findByClassName(styles_selectors_js_2.default.content);
    }
    findDismissButton() {
        return this.findComponent(`.${styles_selectors_js_2.default['dismiss-control']}`, button_1.default);
    }
}
exports.default = ChartPopoverWrapper;
ChartPopoverWrapper.rootSelector = styles_selectors_js_1.default.root;
//# sourceMappingURL=chart-popover.js.map