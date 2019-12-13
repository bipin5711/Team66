import React, { useState, useContext } from 'react';
import { FormLabel, Radio, FormControlLabel } from "@material-ui/core";
import { TextField, RadioGroup } from 'formik-material-ui';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomDatePicker from 'components/Pickers/DatePicker'
import { Formik, Field, Form } from 'formik'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import * as Yup from 'yup'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import { makeStyles } from "@material-ui/core/styles";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'too Short!')
    .required('Required'),
  preferredName: Yup.string(),
  birthDate: Yup.date().nullable()
    .min(new Date('01-01-1960'), 'Birth Date must be greater than 01-01-1960')
    .max(new Date(), 'Birth Date is cannot greater than current day')
    .required('Birth date is Required'),


});
const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }

})
function EmployeeInformation(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Employee Information')
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
          fullName: values.fullName,
          maritalStatus: values.maritalStatus,
          preferredName: values.preferredName,
          birthDate: values.birthDate,
          gender: values.gender
        })

      }}
      render={() => (
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Field
                label="Full Name(As on your ID)"
                id="fullName"
                name="fullName"
                component={TextField}
                className={classes.field}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <Field
                label="Preferred Name"
                id="preferredName"
                name="preferredName"
                className={classes.field}
                component={TextField}
                fullWidth
              />

            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Birth Date</FormLabel>
              <Field
                name="birthDate"
                component={CustomDatePicker}
                // label="Date"
                placeholder="Enter Date of Birth"
                fullWidth
                format="dd/MM/yyyy"
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Gender</FormLabel>
              <Field fullWidth
                id="gender"
                name="gender"
                component={RadioGroup}
                row
              >
                <FormControlLabel
                  id="gender"
                  label="Male"
                  control={<Radio id="gender" color="secondary" />}
                  value="male"
                />
                <FormControlLabel
                  id="gender"
                  value="female"
                  control={<Radio id="gender" color="secondary" />}
                  label="Female"
                />
              </Field>
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Marital Status</FormLabel>
              <Field fullWidth
                id="maritalStatus"
                name="maritalStatus"
                component={RadioGroup}
                row
              >
                <FormControlLabel
                  id="maritalStatus"
                  label="Married"
                  control={<Radio id="maritalStatus" color="secondary" />}
                  value="married"
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="single"
                  control={<Radio id="maritalStatus" color="secondary" />}
                  label="Single"
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="other"
                  control={<Radio id="maritalStatus" color="secondary" />}
                  label="Other"
                />
              </Field>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={5}>
              <StepperNavigationButtons />
            </GridItem>

          </GridContainer>
        </Form>
      )}
    >
    </Formik>
  );
}

export default EmployeeInformation;