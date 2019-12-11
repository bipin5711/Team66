import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
// import {DropzoneArea} from 'material-ui-dropzone'

const dropzoneStyle = {
  width: "100%",
  height: "auto",
  borderWidth: 2,
  borderColor: "rgb(102, 102, 102)",
  borderStyle: "dashed",
  borderRadius: 5,
}
function CustomDropzone(props) {

  const { field, form,values, ...rest } = props;
  const error = form.touched[field.name] && form.errors[field.name];
  const [filename, setFilename] = useState('')
  const [file, setFile] = useState('')
  function handleOnDrop(files, rejectedFiles) {
    const curfile = files[0]
    setFilename(files[0].name)
    form.setFieldValue(field.name, files[0].name)
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      setFile(reader.result)
    }, false)
    reader.readAsDataURL(curfile)
  }
  //   function handleOnDrop(acceptedFiles) {
  //     form.setFieldValue(field.name, values.files.concat(acceptedFiles));
  // }
  
  return (
    <Dropzone 
    
      onDrop={handleOnDrop}
      // onChange={(e) => form.setFieldValue(field.name, e)}
      multiple="true">
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div>{filename==="" ? "Add file" : filename}
          </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
}

CustomDropzone.propTypes = {
  field: PropTypes.objectOf({
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.objectOf({
    touched: PropTypes.instanceOf(Array),
    errors: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default CustomDropzone;