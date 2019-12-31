import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Form, Field } from 'formik'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import api, { toFormData } from '../../lib/axios';

const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})

function EmployeePicture(props) {

  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  const fileList = []
  const fileAttachments = []
  console.log("Data",employeeData)
  setTitle('Employee Picture')

  return (

    <Formik
      initialValues={employeeData}
      // validationSchema={ValidationSchema}
      onSubmit={values => {
        //handleNext()
        let newSkipped = skipped;
        const isStepSkipped = step => {
          return skipped.has(step);
        };
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
        setEmployeeData({
          ...employeeData,
          employeeAttachments:
          values.employeeAttachments
          //  [...employeeData.employeeAttachments,...values.employeeAttachments]
        })
      }}

      >
      {({ values, setFieldValue }) => {
        console.log("values",values)
        return (
          <Form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Upload Picture</FormLabel>
                <CustomDropzone list={values.employeeAttachments ? values.employeeAttachments
                .filter(a=>a.type==="Picture") 
                : []}  
                // attachments={values.attachments ? values.attachments : []} 
                type="Picture"
                 callBack={files => {
                  var exist = 0
                  files.map(file => {
                    fileList.map(existingFile => {
                      if (existingFile.name === file.name && existingFile.size === file.size) {
                        exist = 1
                        // alert("File has already selected")
                      }
                    })
                    if (exist === 0) {
                      fileList.push(file)
                      let test = {
                        file,
                        type: 'Picture'
                      }
                      const fileData = toFormData(test)
                      api.post('employees/file', fileData).then(res => {
                        // setEmployeeData({...employeeData,
                        //   employeeAttachments:[...employeeData.employeeAttachments,res.data.data]})
                        setFieldValue('employeeAttachments',[...values.employeeAttachments,res.data.data])
  
                      }).catch(err => { console.log("err", err) })
                      // const reader=new FileReader()
                      // reader.addEventListener("load",()=>{
                      // console.log("ondrop called")
                      // setImage(reader.result)},false)
                      //   reader.readAsDataURL(file)
                      //   console.log("bipinb",image)
                    }
                    else {
                      exist = 0;
                    }
                  })
                  // setFieldValue('employeeAttachments',values.employeeAttachments)
                  // setFieldValue('picture', fileList)
                }} />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <StepperNavigationButtons />
              </GridItem>
            </GridContainer>
          </Form>
        )
      }}
    
    </Formik>
  );
}

export default EmployeePicture;