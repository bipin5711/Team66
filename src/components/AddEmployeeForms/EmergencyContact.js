import React, { useState, useContext } from 'react';
import { TextField } from 'formik-material-ui'; 
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Field, Form } from 'formik'
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import * as Yup from 'yup'
import { makeStyles } from "@material-ui/core/styles";

const useStyles=makeStyles({
  field:{
    marginTop: "32px"
  }
})

const validationSchema = Yup.object().shape({
  emergencyName1: Yup.string()
    .min(2, 'too Short!')
    .required('Required'),
  emergencyMobile1: Yup.number().typeError('Mobile must be number'),
  // emergencyRelationship1: Yup.string().required('Required')

});

function EmergencyContact(props) {
  const classes=useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Emergency Contact')

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
            emergencyName1: values.emergencyName1,
            emergencyMobile1: values.emergencyMobile1,
            emergencyRelationship1: values.emergencyRelationship1,
            emergencyName2: values.emergencyName2,
            emergencyMobile2: values.emergencyMobile2,
            emergencyRelationship2: values.emergencyRelationship2
          })
        }}
        render={() => (
          <Form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <Field
                  label="Name1"
                  id="emergencyName1"
                  name="emergencyName1"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="Mobile"
                  id="emergencyMobile1"
                  name="emergencyMobile1"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <Field
                  label="Relationship"
                  id="emergencyRelationship1"
                  name="emergencyRelationship1"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={5}>
                <Field
                  label="Name 2"
                  id="emergencyName2"
                  name="emergencyName2"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="Mobile"
                  id="emergencyMobile2"
                  name="emergencyMobile2"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <Field
                  label="Relationship"
                  id="emergencyRelationship2"
                  className={classes.field}
                  name="emergencyRelationship2"
                  component={TextField}
                  fullWidth
                />
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

export default EmergencyContact;