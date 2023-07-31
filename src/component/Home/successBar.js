import * as React from "react";
import Flashbar from "@cloudscape-design/components/flashbar";

const SuccessBar = () => {
  const [items, setItems] = React.useState([
    {
      header: "Successfully logged in",
      type: "success",
      content: "Your alias is in our system",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: "message_1"
    }
  ]);
  return <Flashbar items={items} />;
}

export default SuccessBar;
