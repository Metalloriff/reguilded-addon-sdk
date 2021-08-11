import BaseAddon from "../../lib/baseAddon";
import { getOwnerInstance, waitForElement, React, ReactDOM, loadStyles } from "../../lib";
import patcher from "../../lib/patcher";
import styles from "./styles.scss";

function TooltipComponent({ children, globalContainer, containerRef }) {
    const [visible, setVisible] = React.useState(false);
    const [styles, setStyles] = React.useState(null);
    const ref = React.useRef();
    
    React.useEffect(() => {
        const container = containerRef.current;
        
        const events = {
            onMouseEnter: () => {
                if (visible) return;
                
                const rect = container.getBoundingClientRect();
                const tooltipRect = ref.current.getBoundingClientRect();
                
                setVisible(true);
                setStyles({
                    top: rect.y - tooltipRect.height - 5,
                    left: rect.x - ((tooltipRect.width * 1.25) / 2) + (rect.width / 2)
                });
            },
            onMouseLeave: () => setVisible(false)
        };
        
        container.addEventListener("mouseover", events.onMouseEnter);
        container.addEventListener("mouseout", events.onMouseLeave);
        
        return () => {
            container.removeEventListener("mouseover", events.onMouseEnter);
            container.removeEventListener("mouseout", events.onMouseLeave);
        };
    }, []);
    
    return ReactDOM.createPortal(
        <div className={"LinkTooltipContainer" + (visible ? " Visible" : "")} ref={ref} style={styles}>
            <div className="LinkTooltip">
                { children }
            </div>

            <div className="LinkTooltipArrow"/>
        </div>,
        globalContainer
    );
}

export default new class extends BaseAddon {
    id = "LinkTooltips";
    name = "Link Tooltips";
    
    init(reGuilded, addonManager, webpackManager) {
        this.patchLinkRenderers().catch(console.error.bind(console, this.id, "Failed to patch link renderers!"));
        this.styles = loadStyles(this.id, styles);
        
        this.tooltipsContainer = Object.assign(document.createElement("div"), { className: "GlobalLinkTooltipsContainer" });
        document.body.appendChild(this.tooltipsContainer);
    }
    
    async patchLinkRenderers() {
        const node = await waitForElement("a.LinkRenderer");
        const instance = getOwnerInstance(node);
        const components = [instance.constructor.prototype, instance];
        
        for (const component of components)
            patcher.before(this.id, component, "render", ({ props }) => {
                if (!props?.className || !~props.className.split(" ").indexOf("LinkRenderer")) return;
                if (props?.href === props?.children?.[1]?.props?.children) return;
                const ref = React.createRef();
                
                props.children = (
                    <span className="LinkTooltipWrapper" ref={ref}>
                        { props.children }
                        
                        <TooltipComponent globalContainer={this.tooltipsContainer} containerRef={ref}>
                            { props.href }
                        </TooltipComponent>
                    </span>
                );
            });
        
        instance.forceUpdate();
    }
    
    uninit() {
        patcher.unpatchAll(this.id);
        this.styles.destroy();
        this.tooltipsContainer.remove();
    }
}