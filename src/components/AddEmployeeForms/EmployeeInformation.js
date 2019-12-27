import React, { useState, useContext, useEffect } from 'react';
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
import { format } from 'date-fns';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'too Short!')
    .required('Required'),
  preferredName: Yup.string(),
  birthDate: Yup.date().nullable()
    .min(new Date('01-01-1900'), 'Birth Date must be greater than 01-01-1960')
    .max(new Date(), 'Birth Date is cannot greater than current day')
    .required('Birth date is Required'),


});
const useStyles = makeStyles({
  
  field: {
    marginTop: '32px',
    ['@media (max-width:769px)']: { // eslint-disable-line no-useless-computed-key
      marginTop: '10px'
    }
  }

})
function EmployeeInformation(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  // const [data,setData]=useState({})
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Employee Information')
  console.log("raina",employeeData)
  return (

    <Formik
      initialValues={employeeData}
      // validationSchema={validationSchema}
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
        // alert(values.birthDate.length)
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
        setEmployeeData({
          ...employeeData,
          name: values.name,
          maritalStatus: values.maritalStatus,
          preferredName: values.preferredName,
          birthDate: values.birthDate.length===undefined?format(values.birthDate, 'yyyy-MM-dd'):values.birthDate,
          gender: values.gender
        })
        // console.log(values.name)
      }}
      render={(values) => (
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Field
                label="Full Name(As on your ID)"
                id="name"
                name="name"
                // value={employeeData.name}
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
                format="dd-MM-yyyy"
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
                  value="Male"
                />
                <FormControlLabel
                  id="gender"
                  value="Female"
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
                  value="Married"
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="Single"
                  control={<Radio id="maritalStatus" color="secondary" />}
                  label="Single"
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="Other"
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