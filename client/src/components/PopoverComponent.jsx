import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";


const PopoverComponent = ({ target, content }) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{content}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      {target}
    </OverlayTrigger>
  );
};

export default PopoverComponent;
