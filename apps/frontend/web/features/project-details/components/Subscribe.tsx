import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { CardButton } from "./CardButton";

function Subscribe() {
  const [subscription, setSubscription] = useState(false);
  return (
    <div onClick={() => setSubscription(!subscription)}>
      <CardButton icon={<FaRegPaperPlane />}>
        {subscription ? "Unsubscribe" : "Subscribe"}
      </CardButton>
    </div>
  );
}

export default Subscribe;
