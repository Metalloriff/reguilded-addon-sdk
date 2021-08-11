import BaseAddon from "../../lib/baseAddon";
import * as lib from "./lib";
import patcher from "./patcher";
import ModalStack from "./modalStack";
import * as SettingsFields from "./settingsFields";

export default new class extends BaseAddon {
    id: string = "addonLib";
    name: string = "addonLib";
    
    // TODO replace with init. preinit is so it will work as an addon
    preinit(reGuilded, addonManager) {
        reGuilded.addonLib = {
            ...lib,
            patcher, ModalStack, SettingsFields
        };

        ModalStack.init();
    }
}