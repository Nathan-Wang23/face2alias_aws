import { DrawerConfig, DrawersRegistrationListener } from './drawers-controller';
interface AwsuiPluginApiPublic {
    appLayout: {
        registerDrawer(config: DrawerConfig): void;
    };
}
interface AwsuiPluginApiInternal {
    appLayout: {
        clearRegisteredDrawers(): void;
        onDrawersRegistered(listener: DrawersRegistrationListener): () => void;
    };
}
export declare const awsuiPlugins: AwsuiPluginApiPublic, awsuiPluginsInternal: AwsuiPluginApiInternal;
export {};
//# sourceMappingURL=api.d.ts.map