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
  console.log("Data",employeeData)
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
          employeeAttachments:
          values.employeeAttachments
          //  [...employeeData.employeeAttachments,...values.employeeAttachments]
        })
      }}
      >
        {({ values, setFieldValue }) => {
        console.log("values",values)
        return (
          <Form>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Upload ID Proof</FormLabel>
                <CustomDropzone list={values.employeeAttachments ? values.employeeAttachments
                // .filter(a=>a.type==="Id Proof") 
                : []} 
                // attachments={values.attachments ? values.attachments : []} 
                type="Id Proof"
                setFieldValue={value => setFieldValue('employeeAttachments', value)}
                // callBack={async file => {
                //   try {
                //     let test = {
                //               file,
                //               type: 'Id Proof'
                //             }
                //             const fileData = toFormData(test)
                //     file = toFormData(test);
                //     const { data } = await api.post('employees/file', file);
                //     setFieldValue('employeeAttachments', [
                //       ...values.employeeAttachments,
                //       data.data,
                //     ]);
                //     console.log("21",values.employeeAttachments)
                //   } catch (err) {
                //     console.log(err);
                //   }
                // }}
                // callBack={files => {
                //   var exist = 0
                //   files.map(file => {
                //     fileList.map(existingFile => {
                //       if (existingFile.name === file.name && existingFile.size === file.size) {
                //         exist = 1
                //         // alert("File has already selected")
                //       }
                //     })
                //     if (exist === 0) {
                //       fileList.push(file)
                //       let test = {
                //         file,
                //         type: 'Id Proof'
                //       }
                //       const fileData = toFormData(test)
                //       api.post('employees/file', fileData).then(res => {
                //         // setEmployeeData({...employeeData,
                //         //   employeeAttachments:[...employeeData.employeeAttachments,res.data.data]})
                //         setFieldValue('employeeAttachments',[...values.employeeAttachments,res.data.data])
  
                //       }).catch(err => { console.log("err", err) })
                //     }
                //     else {
                //       exist = 0;
                //     }
                //   })
                //   // setFieldValue('employeeAttachments',[...values.employeeAttachments])
                // }}
                 />

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

export default IdProof;