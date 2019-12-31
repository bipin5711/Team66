import React, { useState, useContext } from 'react';
import { TextField } from 'formik-material-ui'; 
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Field, Form } from 'formik'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { FormLabel } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import api from '../../lib/axios';


const useStyles=makeStyles({
  field:{
    marginTop: "32px"
  }
})

function Feedback(props) {

  const classes=useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Feedback')
  console.log("Data",employeeData)
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
            feedback: values.feedback,
          })
          
          api.post('employees', employeeData).then(res => {
          //  alert("success")

          }).catch(err => { 
            alert("Failed",err)
            console.log("err", err) })

        }}
        render={({ values, setFieldValue }) => {
          console.log("values",values)
          return (
          <Form>
            <GridContainer>

              <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left'}} className={classes.field}>Feedback</FormLabel>
                <Field
                  label="Any feedback to improve the company"
                  id="feedback"
                  name="feedback"
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={12}>
                <StepperNavigationButtons />
              </GridItem>

            </GridContainer>
          </Form>
       )
      }}
    >
      </Formik>
  );
}

export default Feedback;