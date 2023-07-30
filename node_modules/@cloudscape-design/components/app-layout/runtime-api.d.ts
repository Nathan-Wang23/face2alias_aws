import { DrawerConfig as RuntimeDrawerConfig } from '../internal/plugins/drawers-controller';
import { DrawerItem } from './drawer/interfaces';
export interface DrawersLayout {
    before: Array<DrawerItem>;
    after: Array<DrawerItem>;
}
export declare function convertRuntimeDrawers(drawers: Array<RuntimeDrawerConfig>): DrawersLayout;
//# sourceMappingURL=runtime-api.d.ts.map