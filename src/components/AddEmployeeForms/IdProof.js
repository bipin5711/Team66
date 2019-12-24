import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Form } from 'formik'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import api, { toFormData } from '../../lib/axios';

const useStyles = makeStyles({
  field: {
    marginTop: "32px"
  }
})
function IdProof(props) {

  const classes = useStyles()
  const [employeeData, setEmployeeData] = useContext(EmployeeContext)
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const [title, setTitle] = useContext(TitleContext);
  const fileList = []
  const fileAttachments = []
  setTitle('ID Proof')

  return (
    <Formik
      initialValues={employeeData}
      // validationSchema={ValidationSchema}
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
          employeeAttachments: [...employeeData.employeeAttachments, ...values.attachments]
        })
      }}
      render={({ values, setFieldValue }) => {
        return (
          <Form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Upload ID Proof</FormLabel>
                <CustomDropzone list={values.idProof ? values.idProof : []} attachments={values.attachments ? values.attachments : []} callBack={files => {
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
                        type: 'Id Proof'
                      }
                      const fileData = toFormData(test)
                      api.post('employees/file', fileData).then(res => {
                        fileAttachments.push(res.data.data)
                        setFieldValue('attachments', fileAttachments)
  
                      }).catch(err => { console.log("err", err) })
                    }
                    else {
                      exist = 0;
                    }
                  })
                  setFieldValue('idProof', fileList)
                }} />

              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
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

export default IdProof;