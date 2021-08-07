import BaseAddon from "../../lib/baseAddon";
import * as lib from "./lib";
import patcher from "./patcher";
import ModalStack from "./modalStack";
import * as SettingsFields from "./settingsFields";

export default new class extends BaseAddon {
    id: string = "addonLib";
    name: string = "addonLib";
    
    init(reGuilded, addonManager, webpackManager) {
        reGuilded.addonLib = {
            ...lib,
            patcher, ModalStack, SettingsFields
        };

        ModalStack.init();
    }
}