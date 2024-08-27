import React, { useEffect } from 'react'
import FileUpload from '../components/Uploader/Uploader'
import FolderUpload from '../components/Uploader/Folderuploader'
import Potreeviewer from './Potreeviewer'

const Landing = () => {

    useEffect(()=>{

    },[])
  return (
    <div>

        {/* <FileUpload/> */}
        <FolderUpload/>
        <Potreeviewer/>
      
    </div>
  )
}

export default Landing
