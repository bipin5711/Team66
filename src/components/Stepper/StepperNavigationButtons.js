import React, { useContext, createContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { StepContext } from 'views/Employee/Add'
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(1),
    marginTop: "32px",
    // paddingBottom: "10px"
  },
}));
function getSteps() {
  return ['Employee Information', 'Current Address', 'Permanent Address', 'Emergency Contact', 'Job Details', 'Id Prrof', 'Employee Picture', 'Feedback'];
}
export default function StepperNavigationButtons() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useContext(StepContext);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const isStepOptional = step => {
    return step === 7 || step === 5 ;
  };
  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <div>
      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
        Back
      </Button>

      {isStepOptional(activeStep) && (<Button
        variant="contained"
        color="primary"
        onClick={handleSkip}
        className={classes.button}
      >Skip</Button>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        //   onClick={handleNext}
        className={classes.button}
      >
        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
};