import { Modal } from "antd";
const countDown = (props) => {
  const modal = Modal.success({
    title: props.title,
    content: props.content,
  });

  setTimeout(() => {
    modal.destroy();
  }, 5 * 1000);
};
export default countDown;
