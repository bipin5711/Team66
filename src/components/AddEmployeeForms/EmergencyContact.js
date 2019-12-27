import React, { useState, useContext } from 'react';
import { TextField } from 'formik-material-ui';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Field, Form, yupToFormErrors, FieldArray } from 'formik'
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
  emergencyContacts:Yup.array()
  .of( 
    Yup.object().shape(
    {
      name: Yup.string().min(2, 'too Short!').required('Required'),
      mobile: Yup.number().typeError('Mobile must be number').required('Required!'),
      relationship: Yup.string().required('Required')
      // mobile2: Yup.number().typeError('Mobile must be number')
    }))})

function EmergencyContact(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  setTitle('Emergency Contact')
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
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
        setEmployeeData({
          ...employeeData,
          emergencyContacts:[
            ...values.emergencyContacts
            // {
            // id:0,
            // name: values.emergencyContacts[0].name,
            // mobile: values.emergencyContacts[0].mobile,
            // relationship: values.emergencyContacts[0].relationship
           
            // },
            // {id:2,
            //   name: values.emergencyContacts[1].name,
            //   mobile: values.emergencyContacts[1].mobile,
            //   relationship: values.emergencyContacts[1].relationship,
             
            //   }
            ]
        })
        console.log("1",values.emergencyContacts)

          // console.log("1",values.emergencyContacts.mobile)

          // console.log("1",values.emergencyContacts.relationship)
      }}
      render={(values,setFieldValue) => (
        <Form>
          <GridContainer>
          <FieldArray
            name="emergencyContacts"
            render={arrayHelpers => (
              <React.Fragment>
                {employeeData.emergencyContacts.map((friend, index) => (
                  <React.Fragment>
                    <GridItem xs={12} sm={12} md={5}>
                    <Field 
                    name={`emergencyContacts[${index}].name`}  
                    className={classes.field}
                    label="Name"
                    component={TextField}
                    fullWidth
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                    <Field 
                    name={`emergencyContacts[${index}].mobile`}
                    label="Mobile"
                    className={classes.field}
                    component={TextField}
                    fullWidth 
                    />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <Field 
                    name={`emergencyContacts[${index}].relationship`}
                    label="Relationship"
                    className={classes.field}
                    component={TextField}
                    fullWidth />
                    </GridItem>
                  </React.Fragment>
                ))}
                
              </React.Fragment>
            )}
          />
           {/* <GridItem xs={12} sm={12} md={5}>
               <Field
                label="Name1"
                id="emergencyContacts.name"
                name="emergencyContacts.name"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="Mobile"
                id="emergencyContacts.mobile"
                name="emergencyContacts.mobile"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Field
                label="Relationship"
                id="emergencyContacts.relationship"
                name="emergencyContacts.relationship"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={5}>
              <Field
                label="Name 2"
                id="emergencyContacts.name2"
                name="emergencyContacts.name2"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="Mobile"
                id="emergencyContacts.mobile2"
                name="emergencyContacts.mobile2"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={3}>
              <Field
                label="Relationship"
                id="emergencyContacts.relationship2"
                className={classes.field}
                name="emergencyContacts.relationship2"
                component={TextField}
                fullWidth
              />
            </GridItem> */}

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