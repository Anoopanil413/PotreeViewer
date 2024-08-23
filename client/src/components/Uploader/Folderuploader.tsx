import React, { useState } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const FolderUpload = () => {
  const [files, setFiles] = useState<any>([]);
  const [uploadProgress, setUploadProgress] = useState<any>({});
  const [allFileUploaded,setAllFileUploaded ] = useState(false);

  const handleFolderChange = ({ fileList }:any) => {
    setFiles(fileList);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      message.warning('Please select a folder first!');
      return;
    }

     await uploadFiles ();
    await convertUploadedFile()

        alert('File uploaded and converted')


  };


  const uploadFiles = async()=>{
    for (const file of files) {
        console.log("filesonit",file)

        const formData = new FormData();
        formData.append('file', file.originFileObj);
      formData.append('folderName', file?.originFileObj?.webkitRelativePath.split('/')[0]); 

      try {
        const response = await axios.post('http://localhost:3008/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            console.log("progressEvent",progressEvent)
            if(!progressEvent.total)return
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress((prevProgress:any) => ({
              ...prevProgress,
              [file.uid]: percentCompleted,
            }));
          },
        });

        if (response.status === 200) {
          message.success(`File ${file.name} uploaded successfully!`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // message.error(`File upload failed for ${file.name}!`);
        // setAllFileUploaded(false)
      }
    }
  }

  const convertUploadedFile = async()=>{
    try {

        if(!files  || !files[0].originFileObj)return false

        const fileName = files[0].originFileObj?.webkitRelativePath.split('/')[0];
        
        const fileConvertion = await axios.post('http://localhost:3008/uploadcomplete',{fileName:fileName},
                { headers: {
                'Content-Type': 'multipart/form-data',
              },}
        )


        console.log('fileConvertion',fileConvertion.data)

    } catch (error) {
        console.error('Error uploading file:', error);

    }
    
  }

  return (
    <div>
      <Upload
        directory
        beforeUpload={() => false} // Prevent auto upload
        onChange={handleFolderChange}
        maxCount={2000} // Adjust as necessary
      >
        <Button icon={<UploadOutlined />}>Select Folder</Button>
      </Upload>
      {files.map((file:any) => (
        <div key={file.uid} style={{ marginBottom: '10px' }}>
          <span>{file.name}</span>
          {uploadProgress[file.uid] !== undefined && (
            <Progress percent={uploadProgress[file.uid]} />
          )}
        </div>
      ))}
      <Button type="primary" onClick={handleUpload} disabled={files.length === 0}>
        Upload Folder
      </Button>
    </div>
  );
};

export default FolderUpload;
