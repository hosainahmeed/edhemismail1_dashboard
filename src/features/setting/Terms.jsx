import React from "react";
import JoditComponent from "../../components/common/JoditComponent";

function Terms() {
  const [content, setContent] = React.useState("");
  return (
    <div>
      <JoditComponent content={content} setContent={setContent} />
    </div>
  );
}

export default Terms;
