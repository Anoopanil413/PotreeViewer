import React, { useState } from 'react';
import { Upload, Button, Progress, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = ({ file }:any) => {
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) {
      message.warning('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            if(!progressEvent.total)return
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      if (response.status === 200) {
        message.success('File uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('File upload failed!');
    }
  };

  return (
    <div>
      <Upload
        beforeUpload={() => false} 
        onChange={handleFileChange}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {uploadProgress > 0 && <Progress percent={uploadProgress} />}
      <Button type="primary" onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </div>
  );
};

export default FileUpload;
