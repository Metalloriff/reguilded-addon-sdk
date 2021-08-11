import BaseAddon from "../../lib/baseAddon";
import index from "./index.html";
import styles from "./styles.scss";

export default new class WelcomeModal extends BaseAddon {
    id = "welcomeModal";
    name = "WelcomeModal";
    
    async init(reGuilded, addonManager, webpackManager) {
        await new Promise(r => setTimeout(r, 2000));
        
        document.body.appendChild(
            this.container = Object.assign(
                document.createElement("div"),
                {
                    innerHTML: index
                }
            )
        );
        
        document.body.appendChild(
            this.styles = Object.assign(
                document.createElement("style"),
                {
                    innerText: styles.toString()
                }
            )
        );
    }
    
    uninit() {
        this.container.remove();
        this.styles.remove();
    }
}