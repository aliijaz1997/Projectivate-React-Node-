import { Alert } from "@mui/material";
import { useState, useEffect } from "react";
interface Props {
  message: string;
}
export const AlertForMisc = ({ message }: Props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Alert severity="info">
      <p>{message}</p>
    </Alert>
  );
};
