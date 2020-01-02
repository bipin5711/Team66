import { Box } from '@material-ui/core';
import { default as React, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// import { fileIcon } from '../load-steps/UploadDocs';
import api from 'lib/axios'
export default function CustomDropzone({ callBack, list,type}) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      console.log("4",file)
      list.push(file);
      callBack(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const handleDelete = (file, fileName) => {
//     var array = list; // make a separate copy of the array
//     console.log("1", array)
//     var index = array.indexOf(file)
//     console.log("2", index)
//     if (index !== -1) {
//       array.splice(index, 1);
//       list = array
//       console.log("3", list)
     
//     }
//     api.delete(`employees/file/${fileName}`).then(res => {
//       // fileAttachments.push(res.data.data)
//       // setFieldValue('attachments', fileAttachments)
    
//       alert('deleted')

//     }).catch(err => { console.log("err", err) })
    
//     callBack(list)
//   };
  // useEffect(()=>{
  //   return(
  //     <Box p={2}>
  //     {list.map(a => {
  //       return (
  //         <div
  //           style={{
  //             borderRadius: '5px',
  //             backgroundColor: '#9830b0',
  //             padding: '5px 10px',
  //             letterSpacing: '2px',
  //             width: '100%',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //             marginBottom: '1em',
  //             display: 'inline-flex',
  //             color: 'white',
  //           }}
  //         >
  //           <span
  //             style={{
  //               fontSize: '20px',
  //               position: 'relative',
  //               marginRight: '0.5em',
  //               width: '20px',
  //               cursor: 'pointer',
  //             }}
  //             onClick={() => {
  //               handleDelete(a);
  //             }}
  //           >
  //             &times;
  //           </span>
  //           <a
  //             href={typeof a === 'string' ? a : a.url ? a.url : URL.createObjectURL(a)}
  //             target="_blank"
  //             style={{
  //               color: 'white',
  //               textDecoration: 'none',
  //               textTransform: 'uppercase',
  //               fontSize: '10px',
  //               fontWeight: '500',
  //               width: '100%',
  //               textAlign: 'center',
  //               fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
  //             }}
  //           >
  //             {typeof a === 'string' ? 'file' : a.name}
  //           </a>
  //           <span
  //             style={{
  //               position: 'relative',
  //               color: '#9db7c7',
  //               zIndex: '0',
  //               borderRadius: '100%',
  //               display: 'inline-flex',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}
  //           >
  //             {/* {fileIcon(a.type)} */}
  //           </span>
  //         </div>
  //       );
  //     })}
  //   </Box>
  //   )
  // },list)
  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          height: '100px',
          // minWidth: '300px',
          backgroundColor: '#f1f1ff',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dotted #9830b0',
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
      <div style={{ padding: '0px 16px 0px 0px', marginTop: '10px', marginRight: 0, width: '100%' }}>
        <Box p={2} style={{ padding: '0px 16px 0px 0px' }}>
          {list.map(a => {
            if(a.type===type){

            
              return (
              <div
                style={{
                  borderRadius: '5px',
                  backgroundColor: '#9830b0',
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
                {/* {console.log("ds", a)} */}
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
                <a
                  href={typeof a === 'string' ? a : ""}
                  // a.url ? a.url : URL.createObjectURL(a)
                  target="_blank"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    fontWeight: '500',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
                  }}
                >
                  {typeof a === 'string' ? 'file' : a.originalFileName}
                  {/* ? a.name:a.originalFileName */}
                </a>
                            <span
                              style={{
                                fontSize: '20px',
                                position: 'relative',
                                // marginRight: '0.5em',
                                width: '20px',
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                handleDelete(a, a.fileName);
                              }}
                            >
                              &times;
                            </span>
                         
                      
                {/* <span
            style={{
              fontSize: '20px',
              position: 'relative',
              // marginRight: '0.5em',
              width: '20px',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleDelete(a);
            }}
          >
            &times;
          </span> */}
              </div>
            );}
          })}
        </Box></div>
      {/* ds */}
    </div>
  );
}
