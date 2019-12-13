import React, { useState, useContext } from 'react';
import { FormLabel, Radio, FormControlLabel } from "@material-ui/core";
import { TextField, RadioGroup } from 'formik-material-ui';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomDatePicker from 'components/Pickers/DatePicker'
import { Formik, Field, Form } from 'formik'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import * as Yup from 'yup'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})
const validationSchema = Yup.object().shape({
  jobHireDate: Yup.date().nullable()
    .min(new Date('01-01-1960'), 'Hire date must be greater than 01-01-1960')
    .max(new Date(), 'Hire date is cannot greater than current day')
    .required('Hire date is Required'),
  jobSalary: Yup.number().typeError('Salary must be number'),
  jobCurrentSalary: Yup.number().typeError('Current salary must be number')
  // bond: Yup.number()
  //   .required('Required'),

});
function JobDetails(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Job Details')

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
          jobHireDate: values.jobHireDate,
          jobSalary: values.jobSalary,
          jobCurrentSalary: values.jobCurrentSalary,
          jobBond: values.jobBond
        })
      }}
      render={() => (
        <Form>
          <GridContainer>

            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Hire Date</FormLabel>
              <Field
                name="jobHireDate"
                component={CustomDatePicker}
                // label="Date"
                placeholder="Enter Hire Date"
                fullWidth
                format="dd/MM/yyyy"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Salary"
                className={classes.field}
                // placeholder="Please Provide salary when you have joined"
                helperText="Please provide salary when you have joined"
                id="jobSalary"
                name="jobSalary"
                component={TextField}
                fullWidth

              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Current Salary"
                className={classes.field}
                id="jobCurrentSalary"
                helperText="Please provide your current salary"
                name="jobCurrentSalary"
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Have you signed/agreed any bond?</FormLabel>
              <Field fullWidth
                id="jobBond"
                name="jobBond"
                component={RadioGroup}
              >
                <FormControlLabel
                  id="bond"
                  label="1 Year"
                  control={<Radio id="jobBond" />}
                  value="1"
                />
                <FormControlLabel
                  id="bond"
                  value="2"
                  control={<Radio id="jobBond" />}
                  label="2 Year"
                />

                <FormControlLabel
                  id="bond"
                  value="no"
                  control={<Radio id="jobBond" />}
                  label="No"
                />
              </Field>
            </GridItem>

            <GridItem>
              <StepperNavigationButtons />
            </GridItem>
          </GridContainer>
        </Form>
      )
      }
    >

    </Formik>
  );
}

export default JobDetails;