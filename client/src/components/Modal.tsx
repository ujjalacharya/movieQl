import React, { useContext } from "react";
import { GlobalModalContext } from "../context/Modal";

const Modal = () => {
  const { visible, content, setVisible, setContent } =
    useContext<any>(GlobalModalContext);

  return (
    <div id="myModal" className="modal" style={{ display: visible }}>
      <div className="modal__content">
        {content ? (
          <>
            <div className="modal__header">
              <span
                className="close"
                onClick={() => {
                  setVisible("none");
                  setContent(null);
                }}
              >
                &times;
              </span>
              <h2>{content.name}</h2>
            </div>
            <img
              src={content.image}
              alt={content.name}
              className="modal__image"
            />
            <div className="modal__body">{content.description}</div>{" "}
          </>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default Modal;
