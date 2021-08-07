import BaseAddon from "../../lib/baseAddon";
import {getOwnerInstance, React, waitForElement} from "../../lib";
import patcher from "../../lib/patcher";

export default new class extends BaseAddon {
    id: string = "OpenLinksInGuilded";
    name: string = "Open Links In Guilded";
    
    init(reguilded, addonManager, webpackManager) {
        this.patchLinkRenderers().catch(console.error.bind(console, this.id, "Failed to patch link renderers!"));
    }

    async patchLinkRenderers() {
        
    }
}