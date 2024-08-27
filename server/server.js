
import express from 'express'
import path from 'path'
import cors from 'cors'
import 'dotenv/config'

import fileUpload from 'express-fileupload'

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

import {exec} from 'child_process'
import { supabase } from './supabase/supabase.js'
import { uploadFileToBucket } from './utils/utilities.js'



const app = express();

// app.use('/Public/metadata.json', express.static(path.join(__dirname, 'Public/Data/pointclouds/potreetest')));
app.use(cors({origin:'http://localhost:5173'}));
app.use(fileUpload());

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log("__filename",__filename,__dirname)


// const uploadsDir = path.dirname(__dirname, 'uploads');


const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname ,'uploads')));

const storagepath = path.join(__dirname ,'uploads')

const filestoragepath = path.join(__dirname, 'Public', 'Data');


app.use( express.static(filestoragepath));



// app.use(express.static(path.join(__dirname, 'Public', 'Data', 'pointclouds', 'potreetest')));

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const file = req.files.file;
    const folderName = req.body.folderName;
    const uploadPath = path.join(storagepath ,folderName)
  
    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
  
    const filePath = path.join(uploadPath, file.name);
  
    file.mv(filePath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.status(200).send('File uploaded successfully!');
    });
  });

  app.post('/uploadcomplete',async(req,res)=>{
    const {fileName} = req.body;

    console.log(fileName,"fileName")


        const exePath = path.join(__dirname,'PotreeConverter/PotreeConverter.exe');
        const filePathToBeconverted = path.join(storagepath,fileName)


        if(!filePathToBeconverted){
            return res.status(404).json({message:"FileUploaderror"})
        }

        const outputDir = path.join(__dirname,'Public/Data');
    
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log("exePath",exePath,"filePathToBeconverted",filePathToBeconverted,"outputDir",outputDir)

        // const command = `"${exePath}" "${filePathToBeconverted}" -o "${outputDir}" --generate-page potreetest`;
        const command = `"${exePath}" "${filePathToBeconverted}" -o "${outputDir}"`;

        exec(command, async(error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);

             return res.status(500).json({message:'failed to convert file'})
      
            }
            // res.status(200).json({message:stdout});

            if(stdout){
                const metadatapath = path.join(outputDir,'metadata.json')

                if (!fs.existsSync(metadatapath)) {
                    return res.status(404).send('File not found on server.');
                  }

                  const fileBuffer = fs.readFileSync(metadatapath);

                  const dataUploaded = await uploadFileToBucket(fileBuffer,fileName)

                    if(!dataUploaded){
                      console.log("errorerrorerrorerrorerror",error)
                        return res.status(404).send('file convertion failed');
                    }


                    // console.log("data",data,'getting publicUrl',publicUrl);
                    const publicUrl = `${supabase.storage.from('Potree_viewer').getPublicUrl(`folder/${fileName}/metadata.json`).data.publicUrl}`;


                    res.status(200).send({publicUrl:publicUrl})

            
            }


          });

      

  })
// Start the server
const PORT =  3008;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});