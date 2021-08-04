import { ReGuilded, AddonManager, WebpackManager } from "@reguilded/api";

export default class BaseAddon {
    id: string = "";
    name: string = "";
    
    preinit(reGuilded: ReGuilded, addonManager: AddonManager): void {}
    init(reGuilded: ReGuilded, addonManager: AddonManager, webpackManager: WebpackManager): void {}
    uninit(): void {}
};