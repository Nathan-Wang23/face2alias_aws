import * as React from "react";
import Flashbar from "@cloudscape-design/components/flashbar";

const ErrorBar = () => {
  const [items, setItems] = React.useState([
    {
      header: "Alias not in system",
      type: "error",
      content: "Retry login or sign up below.",
      dismissible: true,
      dismissLabel: "Dismiss message",
      onDismiss: () => setItems([]),
      id: "message_1"
    }
  ]);
  return <Flashbar items={items} />;
}

export default ErrorBar;
