import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Form, Field } from 'formik'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
// import { PictureContext } from 'views/Employee/Add';
import Chip from '@material-ui/core/Chip';

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
  const fileList=[]
  // const [picture,setPicture]=useContext(PictureContext)
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
          picture: values.picture,
        })
      }}
        render={({values,setFieldValue}) => {
          return (
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Upload Picture</FormLabel>
              <CustomDropzone list={values.picture} callBack={files=>{
                  var exist=0
                  files.map(file=>{
                    fileList.map(existingFile=>{
                      if(existingFile.name===file.name && existingFile.size===file.size){
                        exist=1
                        // alert("File has already selected")
                      }
                    })
                    if(exist===0){
                    fileList.push(file)
                    }
                    else{
                    exist=0;
                    }
                  })
                  setFieldValue('picture',fileList)
                }} />
              {/* <Field
                // label="Image"
                id="picture"
                name="picture"
                component={CustomDropzone}
                fullWidth
              /> */}
{/* {picture?picture.map(a=>{
                return(<div>
               <Chip label={a.name} color="primary" /><br/><br/></div>
              //  onDelete={handleDelete}
                )})
              :""} */}
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <StepperNavigationButtons />
            </GridItem>
          </GridContainer>
        </Form>
      )}}
    >
    </Formik>
  );
}

export default EmployeePicture;