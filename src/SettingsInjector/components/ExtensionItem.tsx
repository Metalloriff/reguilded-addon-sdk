import {React} from "@reguilded/api/lib";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFolder} from "@fortawesome/free-solid-svg-icons";

const childProcess = require("child_process");

// @ts-ignore
export default function ExtensionItem({ id, name, description, dirname, fp, type, enabledState, enabledStateCallback, children = null }): React.Component {
    // Check for the theme in the enabled list, and create a state based off of that
    const [enabled, setEnabledState] = React.useState(enabledState);
    // Toggle the enabled state and update our component state
    const setEnabled = newState => (setEnabledState(newState), enabledStateCallback(newState));

    return (
        <div className={"ExtItem " + type + (enabled ? " Enabled" : " Disabled")}>
            <div className="Head">
                <div className="Title">{name}</div>
                <div className="ID">ID - <span>{id}</span></div>

                <div className="ToggleSwitchContainer">
                    <input className="ToggleSwitch" type="checkbox"
                           defaultChecked={enabled}
                           onInput={e => setEnabled(e.currentTarget.checked)}/>
                </div>
            </div>

            <div className="Description Placeholder">
                { description?.length ? description : "No description provided." }
            </div>

            <div className="Footer">
                <div className="Buttons">
                    { children }

                    <div className="ButtonContainer" data-tooltip="Edit Source"
                         onClick={() => childProcess.exec(`start "" "${fp}"`)}>
                        <FontAwesomeIcon icon={faEdit} className="Button"/>
                    </div>

                    <div className="ButtonContainer" data-tooltip="Open Containing Folder"
                         onClick={() => childProcess.exec(`start "" "${dirname}"`)}>
                        <FontAwesomeIcon icon={faFolder} className="Button"/>
                    </div>
                </div>
            </div>
        </div>
    );
}