// Import the base addon class object to extend from
import BaseAddon from "../../lib/baseAddon";
// Import some lib entries
// NOTE - If you use JSX, you need to import React or you will get an error
import { loadStyles, ReactDOM, React } from "../../lib/index";
// Import our SCSS styles. Also supports SASS and vanilla CSS.
import styles from "./styles.scss";
// Import our modal component. You can also import TypeScript and TSX
import ModalComponent from "./modal";

// Export your addon as default or it will not work
export default new class extends BaseAddon {
    // Defining an ID and name is necessary
    id = "ExampleAddon";
    name = "Example Addon";

    // init is called when the plugin is loaded. There is also preinit.
    init(reGuilded, addonManager, webpackManager) {
        // Inject our styles
        console.log("what", styles);
        this.styles = loadStyles(this.id, styles);
        
        // Create a container to mount our component
        // Normally you'd want to patch into the render even of an existing component
        this.container = document.createElement("div");
        document.body.appendChild(this.container);
        
        // Mount our component to the container
        ReactDOM.render(<ModalComponent/>, this.container);
    }
    
    // uninit is called when the plugin is ready to unload
    // It's important to properly clean up your addons when they're unloaded
    uninit() {
        // Un-inject our styles
        this.styles.destroy();
        
        // Unmount our component and remove our node
        ReactDOM.unmountComponentAtNode(this.container);
        this.container.remove();
    }
};