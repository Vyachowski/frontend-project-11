import setElementText from "../../utilities/setElementText.js";
import setElementStyle from "../../utilities/setElementStyle.js";
import {buttonElement, inputElement, messageElement} from "./index.js";

const renderError = (errorText) => {
  setElementText(messageElement, errorText);
  setElementStyle(messageElement, 'danger');
  setElementStyle(inputElement, 'invalid');
  buttonElement.disabled = true;
};

export default renderError;
