import React, { useState, useContext, useEffect, Fragment } from 'react';
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
  const [title, setTitle] = useContext(TitleContext);
//  const [file,setFile]=useState()
//   const [fileEdited,setFileEdited]=useState(false)
  // const [currentAddressProof,setCurrentAddressProof]=useState([])
  // useEffect(()=>{
  //   // setCurrentAddressProof(employeeData.employeeAttachments.filter(a=>a.type==="Current Address Proof"))
  //   // console.log("a1",currentAddressProof)
  //   setFieldValue('employeeAttachments',employeeData.employeeAttachments)
  // },[])
  
  let fileList = []
  // const customSetFieldValue=({name,value,formik: { setFieldValue }})=>{
  //   setFieldValue(name,value)
  // }
  setTitle('Current Address')
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
        // console.log(values.employeeAttachments,'  dsf',currentAddressProof)
        setEmployeeData({
          ...employeeData,
          currentAddress: {
            // id: null,
            
            street1: values.currentAddress.street1,
            street2: values.currentAddress.street2,
            city: values.currentAddress.city,
            state: values.currentAddress.state,
            country: values.currentAddress.country
          },
          
          employeeAttachments:
            [...values.employeeAttachments]
        //   [...employeeData.employeeAttachments,...values.employeeAttachments]
        })
      }}
    >
      {({ setFieldValue, values }) => {
        console.log("values",values)
        return (
          <Form>
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
                {/* <Field name="employeeAttachments" id="employeeAttachments"></Field> */}
                <CustomDropzone list={values.employeeAttachments ? values.employeeAttachments
                // .filter(a=>a.type==="Current Address Proof")
                : []}
                setFieldValue={value => setFieldValue('employeeAttachments', value)}
                type="Current Address Proof"
                // callBack={async file => {
                //     try {
                //     // setFieldValue('employeeAttachments',[...values.employeeAttachments])
                      
                //     // console.log(values.employeeAttachments)
                //       // let test = {
                //       //           file,
                //       //           type: 'Current Address Proof'
                //       //         }
                //       // file = toFormData(test);
                //       // const { data } = await api.post('employees/file', file);
                     
                //       // // setFieldValue('employeeAttachments',[...values.employeeAttachments])
                //       // setFieldValue('employeeAttachments',[...values.employeeAttachments,data.data])
                   
                      
                //       // customSetFieldValue('employeeAttachments',data.data)
                //       // console.log("21",values.employeeAttachments[0])
                //       // console.log("21",values.employeeAttachments)
                   
                //     } catch (err) {
                //       console.log(err);
                //     }
                //   }

                // }
                  // fieldValue={values.employeeAttachments}
                  // setFieldValue={value => setFieldValue('employeeAttachments', value)}
                    
                  //   (files) => {
                  //   files.map(file => {

                  //     var exist = 0
                  //     fileList.map(existingFile => {
                  //       if (existingFile.name === file.name && existingFile.size === file.size) {
                  //         exist = 1;
                  //       }
                  //     })
                  //     if (exist === 1) {
                  //       exist = 0;
                  //     }
                  //     else {
                  //       fileList.push(file)
                  //       let test = {
                  //         file,
                  //         type: 'Current Address Proof'
                  //       }
                  //       const fileData = toFormData(test)
                  //       api.post('employees/file', fileData).then(res => {
                          
                  //         // setEmployeeData({...employeeData,employeeAttachments:[...employeeData.employeeAttachments,res.data.data]})
                  //         // setEmployeeData({...employeeData,
                  //         //   employeeAttachments:[...employeeData.employeeAttachments,res.data.data]})
                  //         console.log("1",currentAddressProof)
                  //         setCurrentAddressProof([...currentAddressProof,res.data.data])
                  //         console.log("2",currentAddressProof)
                  //         // setFieldValue('employeeAttachments', [...values.employeeAttachments, currentAddressProof])
                  //         // console.log("res",res.data.data)
                  //         // console.log("values.employeeAttachments ", values.employeeAttachments)
                  //       }).catch(err => { console.log("err", err) })
                        
                  //     }
                  //   })
                   
                  // }
                // }
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

export default CurrentAddress;