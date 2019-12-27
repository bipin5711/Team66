import React, { createContext, useState, useEffect } from 'react';
import EmployeeInformation from 'components/AddEmployeeForms/EmployeeInformation';
import CurrentAddress from 'components/AddEmployeeForms/CurrentAddress';
import PermanentAddress from 'components/AddEmployeeForms/PermanentAddress';
import EmergencyContact from 'components/AddEmployeeForms/EmergencyContact';
import JobDetails from 'components/AddEmployeeForms/JobDetails';
import IdProof from 'components/AddEmployeeForms/IdProof';
import EmployeePicture from 'components/AddEmployeeForms/EmployeePicture';
import Feedback from 'components/AddEmployeeForms/Feedback';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Snackbar from "components/Snackbar/Snackbar.js";
import InfoIcon from '@material-ui/icons/Info';
// import { addEmployee} from 'redux/EmployeeAction'

// const initialValues = {
//   fullName: '',
//   preferredName: '',
//   birthDate: null,
//   gender: '',
//   maritalStatus: '',
//   currentStreet1: '',
//   currentStreet2: '',
//   currentCity: '',
//   currentState: '',
//   currentCountry: '',
//   currentAddressProof: [],
//   permanentStreet1: '',
//   permanentStreet2: '',
//   permanentCity: '',
//   permanentState: '',
//   permanentCountry: '',
//   permanentAddressProof: [],
//   emergencyName1: '',
//   emergencyMobile1: '',
//   emergencyRelationship1: '',
//   emergencyName2: '',
//   emergencyMobile2: '',
//   emergencyRelationship2: '',
//   jobHireDate: null,
//   jobSalary: '',
//   jobCurrentSalary: '',
//   jobBond: '',
//   idProof: [],
//   picture: [],
//   // image:'',
//   feedback: ''
// }

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    // marginBottom: "3px",
    // marginTop: "0px",
    marginTop: "10px",
    marginBottom: "10px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none"
  }
}));


const initialValues={
  birthDate: null,
  bond: '',
  currentAddress: {
    city: '',
    country: '',
    id: 0,
    state: '',
    street1: '',
    street2: ''
  },
  currentSalary: '',
  emergencyContacts: [
    {
      id: 0,
      mobile: '',
      name: '',
      relationship: ''
    },
    {
      id: 1,
      mobile: '',
      name: '',
      relationship: ''
    }
  ],
  employeeAttachments: [
    // {
    //   fileName: '',
      // id: '',
    //   originalFileName: '',
    //   size: '',
    //   type: ''
    // }
  ],
  feedback: '',
  gender: '',
  id: 0,
  hireDate:null,
  maritalStatus: '',
  name: '',
  permanentAddress: {
    city: '',
    country: '',
    id: 0,
    state: '',
    street1: '',
    street2: ''
  },
  preferredName: '',
  salary: ''
}
// const QontoConnector = withStyles({
//   alternativeLabel: {
//     // top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   active: {
//     '& $line': {
//       borderColor: '#9830b0',
//     },
//   },
//   completed: {
//     '& $line': {
//       borderColor: '#9830b0'
//     },
//   },
//   line: {
//     borderColor: '#999999',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },


// })(StepConnector);

// const useQontoStepIconStyles = makeStyles({
//   root: {
//     color: 'red',
//     display: 'flex',
//     height: 22,
//     alignItems: 'center',
//   },
//   active: {
//     color: '#9830b0',
//   },
//   circle: {
//     width: 25,
//     height: 25,
//     borderRadius: '50%',
//     backgroundColor: '#eaeaf0',

//   },
//   completed: {
//     color: '#ffffff',
//     backgroundColor:'#9830b0',
//     width: 25,
//     height: 25,
//     borderRadius: '50%',
//     zIndex: 1,
//     fontSize: 18,
//   },
// });
// function QontoStepIcon(props) {
//   const classes = useQontoStepIconStyles();
//   const { active, completed } = props;

//   return (
//     <div>
//       {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
//     </div>
//   );
// }
function getSteps() {
  // return ['', '', '', '', '', '', '', ''];
  return ['Employee Information', 'Current Address', 'Permanent Address', 'Emergency Contact', 'Job Details', 'Id Proof', 'Employee Picture', 'Feedback'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <EmployeeInformation />;
    case 1:
      return <CurrentAddress />;
    case 2:
      return <PermanentAddress />;
    case 3:
      return <EmergencyContact />;
    case 4:
      return <JobDetails />;
    case 5:
      return <IdProof />;
    case 6:
      return <EmployeePicture />;
    case 7:
      return <Feedback />;
    default:
      return 'Unknown step';
  }
}


export const EmployeeContext = createContext()
export const TitleContext = createContext()
export const EmployeeDataContext = createContext()
export const StepContext = createContext()
export const SkipContext = createContext()

function AddEmployee(props) {

  const classes = useStyles();
  // const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [employeeData, setEmployeeData] = useState(initialValues)
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [addSnackbar,setAddSnackbar]=useState(false)
  useEffect(() => {
    // dispatch({ type:'ADD_EMPLOYEE',payload:employeeData })
  // console.log(employeeData)
    // dispatch(addEmployee(employeeData))
    // console.log("team66",employeeData)
    activeStep === steps.length?setAddSnackbar(true):setAddSnackbar(false)
  })

  const isStepOptional = step => {
    return step === 7 || step === 5 ;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div>
      <GridContainer zeroMinWidth>
        <GridItem xs={12} sm={12} md={12} lg={12} xl={12} zeroMinWidth>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{title}</h4>
              {/* <h4 className={classes.cardTitleWhite}>Add Employee</h4>
              <p className={classes.cardCategoryWhite}>{title}</p> */}
            </CardHeader>
            <CardBody>
              {/* <div className={classes.root}> */}
              <Stepper style={{padding:'5px 0px'}} activeStep={activeStep} alternativeLabel noWrap>
                {/* connector={<QontoConnector />} */}
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = <Typography variant="caption">Optional</Typography>;
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps} noWrap>{label}</StepLabel>
                      {/* StepIconComponent={QontoStepIcon} */}
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
            </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
            </Button>
            <Button component={Link} to="/admin/employees" className={classes.button}>View Submitted Data</Button>
                  </div>
                ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        <EmployeeContext.Provider value={[employeeData, setEmployeeData]}>
                          <StepContext.Provider value={[activeStep, setActiveStep]}>
                            <SkipContext.Provider value={[skipped, setSkipped]}>
                              <TitleContext.Provider value={[title, setTitle]}>
                                        {getStepContent(activeStep)}
                              </TitleContext.Provider>
                            </SkipContext.Provider>
                          </StepContext.Provider>
                        </EmployeeContext.Provider>
                      </Typography>

                    </div>
                  )}
              </div>
              {/* </div> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Snackbar
              place="bl"
              color="primary"
              icon={InfoIcon}
              message="Employee Added Successfully"
              open={addSnackbar}
              closeNotification={() => setAddSnackbar(false)}
              close
            />
    </div>
  );
}
export default AddEmployee