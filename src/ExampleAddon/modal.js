// Import React
import { React } from "../../lib/index";

// Export our example modal component
export default function ModalComponent() {
    // Create an extremely simple opened state to handle closing and opening
    const [opened, setOpenedState] = React.useState(true);
    
    // Build our component
    // Normally if you're creating any sort of modals system, you would not do this, you would do something that's not shit
    return opened ? (
        <div className="ExampleModalContainer">
            <div className="ModalExample">
                <div className="Title">Example Modal</div>
                <div className="Body">This is an example plugin, and if you didn't read the code, you have been rick rolled.</div>

                <img className="Image" src="https://media1.tenor.com/images/8c409e6f39acc1bd796e8031747f19ad/tenor.gif?itemid=17029825" alt="kekw"/>

                <div className="Footer">
                    <div className="Button">Button</div>
                    <div className="Button" style={{ backgroundColor: "#ff7777" }}
                         onClick={() => setOpenedState(false)}>Button That Also Happens To Close The Modal</div>
                </div>
            </div>
        </div>
    ) : null;
}