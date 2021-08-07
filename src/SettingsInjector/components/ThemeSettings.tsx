﻿import {React} from "@reguilded/api/lib";
import {ReGuilded} from "@reguilded/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faEdit, faFolder} from "@fortawesome/free-solid-svg-icons";
import {ColorField, StringField} from "@reguilded/api/settingsFields";
import ModalStack from "@reguilded/api/modalStack";
import {ThemeSettingsHandler} from "../index";
import ExtensionItem from "./ExtensionItem";

// Awww yeaaahh
const path: any = require("path");
const fs: any = require("fs");

// This is used to convert the css variable names from kebab case to.. normal case?
// some-var-name > Some Var Name
function formatCssVarName(name: string): string {
    return name
        .split("-")
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function openThemeSettings(variables: [line: string, propName: string, propValue: string][], id: string): void {
    function handleCallback(propName: string, defaultValue: string, value: string): void {
        if (value === defaultValue)
            return ThemeSettingsHandler.overrides[id].reset(propName);
        ThemeSettingsHandler.overrides[id].set(propName, value);
    }
    
    const components = variables.map(([, name, defaultValue]) => {
        const value: string = ThemeSettingsHandler.overrides[id].get(name, defaultValue);
        
        if (defaultValue.startsWith("#"))
            // Variable is a color, provide a color field
            return <ColorField title={formatCssVarName(name)} defaultValue={value}
                               key={name}
                               callback={handleCallback.bind(null, name, defaultValue)}/>;
        
        return <StringField title={formatCssVarName(name)} defaultValue={value}
                            key={name}
                            callback={handleCallback.bind(null, name, defaultValue)}/>;
    }).filter(v => v);
    
    ModalStack.push(
        <div className="ThemeSettings">
            { components }
        </div>
    );
}

// @ts-ignore
function ThemeItem({ id, name, css, dirname }): React.Component {
    // Some memos, for that tasty performance boost that we don't need
    // Literally 0 reason to use a memo for this, but I did anyways
    const fp: string = React.useMemo(() => path.join(dirname, css), [dirname, css]);
    // Get the source code and store it in a memo
    const data: string = React.useMemo(() => fs.readFileSync(fp, "utf8"), [dirname, css]);
    // Match all of our variables in and place them in an array
    const variables: [line: string, propName: string, propValue: string][] =
        React.useMemo(() => [...data.matchAll(/--(\S+?):(?:\s*)?(\S*?);/g)]);
    
    function handleEnabledStateChanged(state): void {
        // Get the config object
        const config = ReGuilded.settingsManager.config.themes;
        const themes = ReGuilded.themesManager;
        
        // The new state is true, enable the theme and add it to the config
        if (state) {
            ReGuilded.themesManager.load(ReGuilded.themesManager.all.find(theme => theme.id === id));
            config.enabled = [...config.enabled, id];
        }
        // The state is false, disable the theme and remove it from the config
        else {
            ReGuilded.themesManager.unload(id);
            config.enabled = config.enabled.filter(_id => _id !== id);
        }
        
        // Spaghetti
        themes.enabled = config.enabled;
        
        // Re-init all theme data
        ThemeSettingsHandler.reInitAll();

        // Write the new date
        fs.writeFileSync(
            path.join(ReGuilded.settingsManager.directory, "settings.json"),
            JSON.stringify(ReGuilded.settingsManager.config, null, "\t")
        );
    }
    
    return (
        <ExtensionItem id={id} name={name} fp={fp} dirname={dirname} type="Theme"
                       enabledState={~ReGuilded.themesManager.enabled.indexOf(id)}
                       enabledStateCallback={handleEnabledStateChanged}>
            { variables.length ?  (
                <div className="ButtonContainer" data-tooltip="Settings"
                     onClick={openThemeSettings.bind(null, variables, id)}>
                    <FontAwesomeIcon icon={faCog} className="Button"/>
                </div>
            ) : null }
        </ExtensionItem>
    );
}

// @ts-ignore
export default function ThemeSettings(): React.Component {
    const [themes, initThemes] = React.useState(ReGuilded.themesManager.all);
    
    return (
        <div className="ReGuildedSettings ThemeSettings">
            <div className="SettingsGroup">
                { themes.length ? (
                    <div className="ExtensionItemsList">
                        { themes.map(theme => <ThemeItem key={theme.id} {...theme}/>) }
                    </div>
                ) : (
                    <div className="NothingHere">
                        There are no themes installed.
                    </div>
                ) }
            </div>
        </div>
    );
}

// // A simple try parser
// function tryParseJson(jsonData: string, fallback: object): object {
//     try { return JSON.parse(jsonData); }
//     catch(e) { return fallback; }
// }
//
// type ThemesOverrideInterfaceState = {
//     overrides: {};
// }
//
// // @ts-ignore
// // The interface component that will override the styles
// export class ThemesOverridesInterface extends React.Component<null, ThemesOverrideInterfaceState> {
//     // The singleton instance
//     static instance: ThemesOverridesInterface;
//
//     // The CSS overrides json file path
//     static fp: string = path.join(ReGuilded.settingsManager.directory, "cssOverrides.json");
//    
//     // Read the data once from the overrides
//     // If the file exists, return its data as utf-8
//     // Else, create the file and return an empty JSON object as string
//     static rawData: string =
//         fs.existsSync(ThemesOverridesInterface.fp)
//             ? fs.readFileSync(ThemesOverridesInterface.fp, "utf8")
//             : (fs.writeFileSync(ThemesOverridesInterface.fp, "{}", { encoding: "utf8" }), "{}");
//     // Try to parse our JSON data
//     static data: object = tryParseJson(ThemesOverridesInterface.rawData, {});
//    
//     static save(): void {
//        
//     }
//    
//     state: ThemesOverrideInterfaceState;
//
//     componentDidMount(): void {
//         // Set our singleton reference
//         ThemesOverridesInterface.instance = this;
//        
//         // Set our initial state
//         this.setState({
//             overrides: ThemesOverridesInterface.data
//         });
//     }
//
//     render() {
//         const { overrides } = this.state;
//        
//         return (
//             <style id="ReGuildedThemesOverrideInterface">
//                 { Object.entries(overrides).map(([propName, propValue]) =>
//                     `--${propName}:${propValue};`) }
//             </style>
//         );
//     }
// }