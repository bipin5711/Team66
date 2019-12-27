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
import { format } from 'date-fns';

const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})
const validationSchema = Yup.object().shape({
  hireDate: Yup.date().nullable()
    .min(new Date('01-01-1960'), 'Hire date must be greater than 01-01-1960')
    .max(new Date(), 'Hire date is cannot greater than current day')
    .required('Hire date is Required'),
  salary: Yup.number().typeError('Salary must be number'),
  currentSalary: Yup.number().typeError('Current salary must be number')
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
  console.log("raina",employeeData)
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
          hireDate: format(values.hireDate, 'yyyy-MM-dd'),
          salary: values.salary,
          currentSalary: values.currentSalary,
          bond: values.bond
        })
      }}
      render={() => (
        <Form>
          <GridContainer>

            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Hire Date</FormLabel>
              <Field
                name="hireDate"
                component={CustomDatePicker}
                // label="Date"
                placeholder="Enter Hire Date"
                fullWidth
                format="dd-MM-yyyy"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Salary"
                className={classes.field}
                // placeholder="Please Provide salary when you have joined"
                helperText="Please provide salary when you have joined"
                id="salary"
                name="salary"
                component={TextField}
                fullWidth

              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Current Salary"
                className={classes.field}
                id="currentSalary"
                helperText="Please provide your current salary"
                name="currentSalary"
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Have you signed/agreed any bond?</FormLabel>
              <Field fullWidth
                id="bond"
                name="bond"
                component={RadioGroup}
              >
                <FormControlLabel
                  id="bond"
                  label="1 Year"
                  control={<Radio id="bond" />}
                  value="1 Year"
                />
                <FormControlLabel
                  id="bond"
                  value="2 Year"
                  control={<Radio id="bond" />}
                  label="2 Year"
                />

                <FormControlLabel
                  id="bond"
                  value="No"
                  control={<Radio id="bond" />}
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