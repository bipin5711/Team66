import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField } from 'formik-material-ui'; 
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
// import { CurrentAddressProofContext } from 'views/Employee/Add';
import Chip from '@material-ui/core/Chip';

const useStyles=makeStyles({
  field:{
    marginTop: "32px"
  }
})

const validationSchema = Yup.object().shape({
  currentStreet1:Yup.string().required('Required'),
  currentCity:Yup.string().required('Required')
  //  addressProof: Yup.string().required('Required')

});

function CurrentAddress(props) {

  const classes=useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  // const [currentAddressProof,setCurrentAddressProof]=useContext(CurrentAddressProofContext)
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  const fileList=[]
  setTitle('Current Address')
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
      <Formik
        initialValues={employeeData}
        validationSchema={validationSchema}
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
            currentStreet1: values.currentStreet1,
            currentStreet2: values.currentStreet2,
            currentCity: values.currentCity,
            currentState: values.currentState,
            currentCountry: values.currentCountry,
            currentAddressProof: values.currentAddressProof
          })
        }}
        render={({values,setFieldValue}) => {
          return (<Form>
<GridContainer>

              <GridItem xs={12} sm={12} md={6}>
                <Field
                  label="Street 1"
                  id="currentStreet1"
                  name="currentStreet1"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Field
                  label="Street 2"
                  id="currentStreet2"
                  name="currentStreet2"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="City"
                  id="currentCity"
                  name="currentCity"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="State"
                  id="currentState"
                  name="currentState"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="Country"
                  id="currentCountry"
                  name="currentCountry"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Current Address Proof</FormLabel>
                <CustomDropzone list={values.currentAddressProof} callBack={files=>{
                  var exist=0
                  files.map(file=>{
                    fileList.map(existingFile=>{
                      if(existingFile.name===file.name && existingFile.size===file.size){
                        exist=1;
                        alert("File has already selected")
                      }
                    })
                    if(exist===0){
                    fileList.push(file)
                    }
                    else{
                    exist=0;
                    }
                  })
                  setFieldValue('currentAddressProof',fileList)
                }} />
                {/* <Field
                  // label="Image"
                  id="currentAddressProof"
                  name="currentAddressProof"
                  component={CustomDropzone}
                  fullWidth
                />
             {currentAddressProof?currentAddressProof.map(a=>{
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
          </Form>)
}}
      > 
    </Formik>
  );
}

export default CurrentAddress;