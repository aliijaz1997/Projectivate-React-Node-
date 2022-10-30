import React, { useState } from "react";
import { ForgetPassword } from "./ForgetPassword";
import InstructionSent from "./InstructionSent";

export default function MainForget() {
  const [changePage, setChangePage] = useState(true);

  const handleOnClick = () => {
    setChangePage(!changePage);
  };
  return (
    <div>
      {changePage ? (
        <ForgetPassword clickHandler={handleOnClick} />
      ) : (
        <InstructionSent />
      )}
    </div>
  );
}
