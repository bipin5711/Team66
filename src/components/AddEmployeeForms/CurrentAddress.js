import React, { useState, useContext, useEffect } from 'react';
import { FormLabel } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { TextField } from 'formik-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import api, { toFormData } from '../../lib/axios';

const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})

const validationSchema = Yup.object().shape({
  currentAddress: Yup.object().shape(
    {
      street1: Yup.string().required('Required'),
      city: Yup.string().required('Required')
    }
  )
});

function CurrentAddress(props) {

  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  // const [file, setFile] = useState()
  const [title, setTitle] = useContext(TitleContext);
  const fileList = []
  const fileAttachments = []
  setTitle('Current Address')
  
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
          currentAddress: {
            id:0,
            street1: values.currentAddress.street1,
            street2: values.currentAddress.street2,
            city: values.currentAddress.city,
            state: values.currentAddress.state,
            country: values.currentAddress.country
          },
          employeeAttachments: [...employeeData.employeeAttachments, ...values.attachments]
        })
      }}
      render={({ values, setFieldValue }) => {
        return (<Form>
          <GridContainer>

            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Street 1"
                id="currentAddress.street1"
                name="currentAddress.street1"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={6}>
              <Field
                label="Street 2"
                id="currentAddress.street2"
                name="currentAddress.street2"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="City"
                id="currentAddress.city"
                name="currentAddress.city"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="State"
                id="currentAddress.state"
                name="currentAddress.state"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <Field
                label="Country"
                id="currentAddress.country"
                name="currentAddress.country"
                className={classes.field}
                component={TextField}
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
        <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Current Address Proof</FormLabel>
              <CustomDropzone list={values.currentAddressProof ? values.currentAddressProof : []} 
              attachments={values.attachments ? values.attachments : []} 
              callBack={files => {
                files.map(file => {
                  console.log(file)
                  var exist = 0
                  fileList.map(existingFile => {
                    if (existingFile.name === file.name && existingFile.size === file.size) {
                      exist = 1;
                      // alert("File has already selected")
                    }
                  })
                  if (exist === 1) {
                    exist = 0;
                  }
                  else {
                    fileList.push(file)
                    let test = {
                      file,
                      type: 'Current Address Proof'
                    }
                    const fileData = toFormData(test)
                    api.post('employees/file', fileData).then(res => {
                      fileAttachments.push(res.data.data)
                      setFieldValue('attachments', fileAttachments)

                    }).catch(err => { console.log("err", err) })
                  }
                })
                console.log("filelist", values.currentAddressProof)
                setFieldValue('currentAddressProof', fileList)
                  // setFile(fileList)
              }}
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
              <StepperNavigationButtons />
            </GridItem>

          </GridContainer>
        </Form>)
      }}
    >
    </Formik>
  );
}

export default CurrentAddress;