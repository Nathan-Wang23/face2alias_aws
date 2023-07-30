export class DrawersController {
    constructor() {
        this.drawers = [];
        this.drawersRegistrationListener = null;
        this.updateTimeout = null;
        this.registerDrawer = (config) => {
            this.drawers = this.drawers.concat(config);
            this.scheduleUpdate();
        };
        this.onDrawersRegistered = (listener) => {
            if (this.drawersRegistrationListener !== null) {
                console.warn('[AwsUi] [runtime plugins] multiple app layout instances detected');
            }
            this.drawersRegistrationListener = listener;
            this.scheduleUpdate();
            return () => {
                this.drawersRegistrationListener = null;
            };
        };
        this.clearRegisteredDrawers = () => {
            this.drawers = [];
        };
    }
    scheduleUpdate() {
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        this.updateTimeout = setTimeout(() => {
            var _a;
            (_a = this.drawersRegistrationListener) === null || _a === void 0 ? void 0 : _a.call(this, this.drawers);
        });
    }
}
//# sourceMappingURL=drawers-controller.js.map