import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Dropzone from 'react-dropzone';
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import { PermanentAddressProofContext } from 'views/Employee/Add';
const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})

const validationSchema = Yup.object().shape({
  permanentStreet1: Yup.string()
    .required('Required'),
  permanentCity: Yup.string()
    .required('Required'),
  //  addressProof: Yup.file().required('Required')

});
function PermanentAddress(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  const [permanentAddressProof,setPermanentAddressProof]=useContext(PermanentAddressProofContext)
  setTitle('Permanent Address')

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
          permanentStreet1: values.permanentStreet1,
          permanentStreet2: values.permanentStreet2,
          permanentCity: values.permanentCity,
          permanentState: values.permanentState,
          permanentCountry: values.permanentCountry,
          permanentAddressProof: values.permanentAddressProof
        })
      }}
      render={() => (
        <Form>
          <GridContainer>

            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Street 1"
                id="permanentStreet1"
                name="permanentStreet1"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Street 2"
                id="permanentStreet2"
                name="permanentStreet2"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="City"
                id="permanentCity"
                name="permanentCity"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="State"
                id="permanentState"
                name="permanentState"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="Country"
                id="permanentCountry"
                name="permanentCountry"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }}
                className={classes.field}>Permanent Address Proof</FormLabel>
              <Field
                // label="Image"
                id="permanentAddressProof"
                name="permanentAddressProof"
                component={CustomDropzone}
                fullWidth
              />
              {permanentAddressProof?permanentAddressProof:""}
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <StepperNavigationButtons />
            </GridItem>
          </GridContainer>
        </Form>
      )}
    >
    </Formik>
  );
}

export default PermanentAddress;