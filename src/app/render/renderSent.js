import createFeedList from "../../utilities/createFeedList.js";
import setElementStyle from "../../utilities/setElementStyle.js";
import setElementText from "../../utilities/setElementText.js";
import {inputElement, messageElement} from "./index.js";

const renderSent = ({posts, feed}) => {
  const listGroup = document.querySelector('.list-group');
  const feedList = createFeedList(posts);
  setElementStyle(messageElement, 'success');
  setElementText(messageElement, 'RSS успешно загружен'); // TODO Change to dynamic message
  setElementText(inputElement, '');
  feedList.forEach((item) => listGroup.appendChild(item));
};

export default renderSent;
