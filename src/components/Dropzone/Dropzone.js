import { Box } from '@material-ui/core';
import { default as React, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import { fileIcon } from '../load-steps/UploadDocs';

export default function CustomDropzone({ callBack, list }) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      list.push(file);
      callBack(list);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //   const handleDelete = async name => {
  //     try {
  //       let exportsAttachments = load.exports.exportsAttachments.filter(atch => atch.name !== name);
  //       setLoad({
  //         ...load,
  //         exportsAttachments,
  //       });
  //     } catch (delError) {
  //       //   openSnackbar('error', delError.message);
  //     }
  //   };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          height: '100px',
          minWidth: '300px',
          backgroundColor: '#f1f1ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dotted #000080',
          borderRadius: '5px',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag 'n' drop files here
          </p>
        )}
      </div>
      <Box p={2}>
        {list.map(a => {
          return (
            <div
              style={{
                borderRadius: '5px',
                backgroundColor: 'black',
                padding: '5px 10px',
                letterSpacing: '2px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1em',
                display: 'inline-flex',
                color: 'white',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  position: 'relative',
                  marginRight: '0.5em',
                  width: '20px',
                  cursor: 'pointer',
                }}
                // onClick={() => {
                //   handleDelete(a.name);
                // }}
              >
                &times;
              </span>
              <a
                href={typeof a === 'string' ? a : a.url ? a.url : URL.createObjectURL(a)}
                target="_blank"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  fontSize: '10px',
                  fontWeight: '500',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {typeof a === 'string' ? 'file' : a.name}
              </a>
              <span
                style={{
                  position: 'relative',
                  color: '#9db7c7',
                  zIndex: '0',
                  borderRadius: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* {fileIcon(a.type)} */}
              </span>
            </div>
          );
        })}
      </Box>
    </div>
  );
}








// import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
// import Dropzone from 'react-dropzone';
// // import {DropzoneArea} from 'material-ui-dropzone'
// import Chip from '@material-ui/core/Chip';
// import Typography from '@material-ui/core/Typography';

// const dropzoneStyle = {
//   width: "100%",
//   height: "auto",
//   borderWidth: 2,
//   borderColor: "rgb(102, 102, 102)",
//   borderStyle: "dashed",
//   borderRadius: 5,
// }
// function CustomDropzone(props) {
//   const { field, form,values, ...rest } = props;
//   console.log("docs",document)
//   const error = form.touched[field.name] && form.errors[field.name];
//   const [filename, setFilename] = useState('')
//   const [file, setFile] = useState('')
//   const handleDelete = () => {
//     console.info('You clicked the delete icon.');
//   };
//   // function handleOnDrop(files, rejectedFiles) {
//   //   const curfile = files[0]
//   //   setFilename(files[0].name)
//   //   form.setFieldValue(field.name, files[0].name)
//   //   const reader = new FileReader()
//   //   reader.addEventListener("load", () => {
//   //     setFile(reader.result)
//   //   }, false)
//   //   reader.readAsDataURL(curfile)
//   // }
//   function handleOnDrop(files)  {
//     // Push all the axios request promise into a single array
//     var data=[]
//     var name=[]
//     const uploaders = files.map(file => {
//       // Initial FormData
//       console.log(file)
//       // const formData = new FormData();
//       // formData.append("file", file);
//       data.push(file)
//       name.push(file.name+" ")
//       form.setFieldValue(field.name, data)
//     console.log("data",data)
//     }
//     )
//     // setFilename(document)
//     setFilename(name)
   
//     // console.log("uploaders",uploaders)
    
//   }
  
//   return (
//     <Dropzone 
    
//       onDrop={handleOnDrop}
//       // onChange={(e) => form.setFieldValue(field.name, e)}
//       multiple="true">
//       {({ getRootProps, getInputProps, isDragActive }) => (
//         <section>
//           <div {...getRootProps()}>
//             <input {...getInputProps()} />
            
//             <div><Typography variant="body1" component="h2">
//             {isDragActive?"Drop it like it's hot!":"Click me or drag a file to upload"}
// </Typography><br/>{filename==="" ? "" : filename.map(f=>{return (<div><Chip label={f} color="primary" /><br/><br/></div>)})}
// {/* onDelete={handleDelete} */}
//           </div>
//           </div>
//         </section>
//       )}
//     </Dropzone>
//   );
// }

// CustomDropzone.propTypes = {
//   field: PropTypes.objectOf({
//     name: PropTypes.string,
//   }).isRequired,
//   form: PropTypes.objectOf({
//     touched: PropTypes.instanceOf(Array),
//     errors: PropTypes.instanceOf(Array),
//   }).isRequired,
// };

// export default CustomDropzone;