import React, { useState, useContext } from 'react';
import { FormLabel } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Formik, Form, Field } from 'formik'
import StepperNavigationButtons from 'components/Stepper/StepperNavigationButtons';
import { StepContext, EmployeeContext, TitleContext } from 'views/Employee/Add'
import { makeStyles } from "@material-ui/core/styles";
import CustomDropzone from 'components/Dropzone/Dropzone'
import { IdProofContext } from 'views/Employee/Add';
import Chip from '@material-ui/core/Chip';

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
  const fileList=[]
  const [idProof,setIdProof]=useContext(IdProofContext)
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
          idProof: idProof,
        })
      }}
      render={() => (
        <Form>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <FormLabel component="legend" style={{ textAlign: 'left' }} className={classes.field}>Upload ID Proof</FormLabel>
              <CustomDropzone list={idProof} callBack={files=>{
                
                files.map(file=>{
                  fileList.push(file)
                })
                console.log("filelist",fileList)
                setIdProof(fileList)
              }} />
              {/* <Field
                // label="Image"
                id="idProof"
                name="idProof"
                component={CustomDropzone}
                fullWidth
              /> */}
            {/* {idProof?idProof.map(a=>{
                return(<div>
               <Chip label={a.name} color="primary" /><br/><br/></div>
              //  onDelete={handleDelete}
                )})
              :""} */}
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

export default IdProof;