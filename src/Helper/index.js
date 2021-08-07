import * as lib from "../../lib/index";
import BaseAddon from "../../lib/baseAddon";

export default new class extends BaseAddon {
    id = "Helper";
    name = "Helper";
    
    init(reGuilded, addonManager, webpackManager) {
        window.lib = lib;
    }
}