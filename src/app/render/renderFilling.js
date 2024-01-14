import setElementText from "../../utilities/setElementText.js";
import setElementStyle from "../../utilities/setElementStyle.js";
import {buttonElement, inputElement, messageElement} from "./index.js";

const renderFilling = () => {
  setElementText(messageElement, '');
  setElementStyle(inputElement, 'valid');
  buttonElement.disabled = false;
};

export default renderFilling;
