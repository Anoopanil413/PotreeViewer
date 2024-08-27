import { supabase } from "../supabase/supabase.js";



async function createBucketIfNotExists() {
    const { data: listData, error: listError } = await supabase.storage.listBuckets();
  
    if (listError) {
      console.error('Error listing buckets:', listError.message);
      return false;
    }
  
    // Check if the bucket already exists
    const bucketExists = listData.some(bucket => bucket.name === 'Potree_viewer');
  
    if (!bucketExists) {
      // Create the bucket if it doesn't exist
      const { data: createdData, error: createError } = await supabase
        .storage
        .createBucket('Potree_viewer', {
          public: false,
          allowedMimeTypes: ['application/json'],
          fileSizeLimit: 1024 * 1024, 
        });
  
      if (createError) {
        console.error('Error creating bucket:', createError.message);
        return false;
      }
    }
  
    return true;
  }

  export async function uploadFileToBucket(fileBuffer,fileName) {
    const bucketCreatedOrExists = await createBucketIfNotExists();
  
    if (!bucketCreatedOrExists) {
      console.error('Bucket creation failed or bucket does not exist');
      return;
    }
  
  
  
    const { data, error } = await supabase.storage
      .from('Potree_viewer')
      .upload(`folder/${fileName}/metadata.json`, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'application/json', 
      });
  
    if (error) {
        console.error('Error uploading JSON data:', error.message);
        return false
    } else {
      console.log('JSON data uploaded successfully:', data);
      return true;
    }
  }
  