declare module "@reguilded/api" {
    import type { FSWatcher } from "fs";
    
    export class ReGuilded {
        static settingsManager: SettingsManager;
        static themesManager: ThemesManager;
        static addonManager: AddonManager;
        static webpackManager: WebpackManager;
    }
    
    export class SettingsManager {
        directory: string;
        config: {
            themes: { enabled: string[] },
            addons: { enabled: string[] }
        };
        
        getThemesDir(): string;
        getAddonsDir(): string;
        
        getValue(prop: unknown): unknown;
        getValueTyped(prop: unknown): unknown;
    }
    
    export class ExtensionManager {
        init(enabled: string[]): void;
        load(extension: string): void;
        unload(extension: string);
        
        getDirs(enabled: string[]): string[];
        loadAll(): void;
        unloadAll(): void;
        
        getPath(name: string): string | void;
    }

    export class ThemesManager extends ExtensionManager {
        dirname: string;
        all: Array<{
            id: string;
            name: string;
            css: string;
            dirname: string;
            watcher: FSWatcher;
        }>;
        enabled: string[];
        
        load(theme: any): void;
        unload(theme: string): void;
        
        isLoaded(id: string): boolean;
    }
    
    export class AddonManager extends ExtensionManager {
        dirname: string;
        parent: ReGuilded;
        
        webpackRequire: Function;
        webpackModules: any;
        webpackFunctions: Function[];

        load(addon: string): void;
        unload(addon: string): void;
        
        all: Array<any>;
        enabled: string[];
    }
    
    export class WebpackManager {
        restMethods: { default: any };
        methods: { default: any };
        chatContext: { default: any };
        sounds: { default: any };
        settingsTabs: { default: any };
        globalBadges: { default: any };
        guildedArticles: { default: any };
        cookies: { default: any };
        channelTypes: { default: any };
        externalSites: { default: any };
        externalSiteInfo: { default: any };
        socialMedia: { default: any };
        teamModel: { default: any };
        groupModel: { default: any };
        channelModel: { default: any };
        userModel: { default: any };
        messageModel: { default: any };
        eventModel: { default: any };
        announcementModel: { default: any };
        documentModel: { default: any };
        listItemModel: { default: any };
        profilePostModel: { default: any };
        editorNodeInfos: { default: any };
        editorNodes: { default: any };
        prismSettings: { default: any };
        languageCodes: { default: any };
        voiceActions: { default: any };

        _webpackRequire: Function;
        _webpackModules: any;
        _webpackExportsList: Array<{
            i: number;
            l: boolean;
            exports: any;
        }>;
        
        asEsModule: (idk: any) => any;
    }
}

declare module "*.scss";