import React, { useState, useContext, useEffect, useRef } from 'react';
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
  const [employeeData, setEmployeeData] =useContext(EmployeeContext)
  // const [initialValues,setInitialValues]=useState()
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  console.log("Data21",employeeData)
  // const isMounted = useRef(null);
  // useEffect(() => {
  //   setInitialValues(employeeData)
  // }, [employeeData]);
  // const [data,setData]=useState({})
  // console.log
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Employee Information')
  return (
    <Formik
    enableReinitialize={true}
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
      render={({ values, setFieldValue }) => {
        console.log("values",values)
        return (
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Field
                id="name"
                name="name"
                // value={values.name}
                component={TextField}
                className={classes.field}
                label="Full Name(As on your ID)"
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <Field
                id="preferredName"
                name="preferredName"
                className={classes.field}
                component={TextField}
                label="Preferred Name"
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
                  control={<Radio id="gender"/>}
                  // value={values.gender?values.gender:"Male"}
                  value="Male"
                  checked={values.gender==="Male"?true:false}
                />
                <FormControlLabel
                  id="gender"
                  value="Female"
                  // value={values.gender?values.gender:"Female"}
                  control={<Radio id="gender"/>}
                  label="Female"
                  checked={values.gender==="Female"?true:false}
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
                  control={<Radio id="maritalStatus" />}
                  value="Married"
                  checked={values.maritalStatus==="Married"?true:false}
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="Single"
                  control={<Radio id="maritalStatus" />}
                  label="Single"
                  checked={values.maritalStatus==="Single"?true:false}
                />
                <FormControlLabel
                  id="maritalStatus"
                  value="Other"
                  control={<Radio id="maritalStatus" />}
                  label="Other"
                  checked={values.maritalStatus==="Other"?true:false}
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
      )
    }}
  >
    </Formik>
  );
}

export default EmployeeInformation;