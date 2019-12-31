import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import { TextField } from 'formik-material-ui';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import api, { toFormData } from '../../lib/axios';
import { clearConfigCache } from 'prettier';
const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})

const validationSchema = Yup.object().shape({
  permanentAddress: Yup.object().shape(
    {
      street1: Yup.string().required('Required'),
      city: Yup.string().required('Required')
    }
  )
});

function PermanentAddress(props) {
  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  console.log("permanent", employeeData.employeeAttachments)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  const fileList = []
  setTitle('Permanent Address')
  console.log("Data",employeeData)
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
          permanentAddress: {
            id: 0,
            street1: values.permanentAddress.street1,
            street2: values.permanentAddress.street2,
            city: values.permanentAddress.city,
            state: values.permanentAddress.state,
            country: values.permanentAddress.country
          },
          employeeAttachments:
            [...values.employeeAttachments]
          // [...employeeData.employeeAttachments,...values.employeeAttachments]
        })

      }}
    >
      {({ values, setFieldValue }) => {
        // console.log("values", values)
        return (
          <Form>
            <GridContainer>

              <GridItem xs={12} sm={12} md={6}>
                <Field
                  label="Street 1"
                  id="permanentAddress.street1"
                  name="permanentAddress.street1"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={6}>
                <Field
                  label="Street 2"
                  id="permanentAddress.street2"
                  name="permanentAddress.street2"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="City"
                  id="permanentAddress.city"
                  name="permanentAddress.city"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="State"
                  id="permanentAddress.state"
                  name="permanentAddress.state"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <Field
                  label="Country"
                  id="permanentAddress.country"
                  name="permanentAddress.country"
                  className={classes.field}
                  component={TextField}
                  fullWidth
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <FormLabel component="legend" style={{ textAlign: 'left' }}
                  className={classes.field}>Permanent Address Proof</FormLabel>
                <CustomDropzone list={values.employeeAttachments ? values.employeeAttachments
                  // .filter(a=>a.type==="Permanent Address Proof")
                  : []}

                  type="Permanent Address Proof"
                  callBack={files => {
                    var exist = 0
                    files.map(file => {
                      fileList.map(existingFile => {
                        if (existingFile.name === file.name && existingFile.size === file.size) {
                          exist = 1
                          // alert("File has already selected")
                        }
                      })
                      if (exist === 0) {
                        fileList.push(file)
                        let test = {
                          file,
                          type: 'Permanent Address Proof'
                        }
                        const fileData = toFormData(test)
                        api.post('employees/file', fileData).then(res => {

                          console.log(" values.employeeAttachments", values.employeeAttachments)
                          // setEmployeeData({...employeeData,
                          //   employeeAttachments:[...employeeData.employeeAttachments,res.data.data]})
                          setFieldValue('employeeAttachments', [...values.employeeAttachments, res.data.data])


                        }).catch(err => { console.log("err", err) })
                      }
                      else {
                        exist = 0;
                      }
                    })

                  }} />
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <StepperNavigationButtons />
              </GridItem>
            </GridContainer>
          </Form>
        )
      }}

    </Formik>
  );
}

export default PermanentAddress;