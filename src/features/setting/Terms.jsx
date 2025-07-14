import React from 'react';
import JoditComponent from '../../components/common/JoditComponent';
import { Button } from 'antd';

function Terms() {
  const [content, setContent] = React.useState('');
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Terms & Condition</h1>
      <JoditComponent content={content} setContent={setContent} />
      <Button
        style={{
          width: '200px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          marginTop: '1rem',
        }}
        onClick={() => {
          console.log(content);
        }}
      >
        Update
      </Button>
    </div>
  );
}

export default Terms;
