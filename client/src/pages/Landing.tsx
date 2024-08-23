import React, { useEffect } from 'react'
import FileUpload from '../components/Uploader/Uploader'
import FolderUpload from '../components/Uploader/Folderuploader'

const Landing = () => {

    useEffect(()=>{

    },[])
  return (
    <div>

        <FileUpload/>
        <FolderUpload/>
      
    </div>
  )
}

export default Landing
