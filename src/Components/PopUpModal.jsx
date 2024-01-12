import React, { useState } from "react";
import { Modal } from "antd";

const PopUpModal = (props) => {
  return (
    <div>
      <Modal {...props} />
    </div>
  );
};

export default PopUpModal;
