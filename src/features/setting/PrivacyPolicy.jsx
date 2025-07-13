import React from 'react'
import JoditComponent from '../../components/common/JoditComponent';

function PrivacyPolicy() {
  const [content, setContent] = React.useState("");
  return (
    <div>
      <JoditComponent content={content} setContent={setContent} />
    </div>
  )
}

export default PrivacyPolicy