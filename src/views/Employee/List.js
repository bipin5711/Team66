import React ,{ useState, useContext } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import { EmployeeDataContext } from 'views/Employee/Add'
import {ShowEmployee} from 'redux/EmployeeAction'
import {connect} from 'react-redux'
import { showEmployee } from 'redux/EmployeeAction';
import { addEmployee } from 'redux/EmployeeAction';

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    // button:{
    //     flexDirection: 'row', 
    //     justifyContent: 'flex-end',
    //     alignSelf: 'flex-end',
    //     alignItems: 'flex-end'
    // }
  };
  
  const useStyles = makeStyles(styles);
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

  

function Employee(props) {
  const employeeData=useContext(EmployeeDataContext)
  console.log("Ds",employeeData)
  const classes = useStyles();
  const rows = [
  //  employeeData.fullName==="undefined"?"":createData(employeeData.fullName,employeeData.fullName,employeeData.fullName,employeeData.fullName,employeeData.fullName)
    // createData('A', 'X', 'X', 'X', 43000),
    // createData('E', 'X', 'X', 'X', 60000),
    // createData('C', 'X', 'X', 'X', 43000),
    // createData('G', 'X', 'X', 'X', 39000),
  ];
  // const data=props.data;
  // console.log("hii",employeeData)
    return (
        <div>
            <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {/* in cardheader we can use plain attribute */}
          <CardHeader color="primary"> 
            <h4 className={classes.cardTitleWhite}>
            Employee Information
              {/* {props.location.state.data} */}
            </h4>
            {/* <p className={classes.cardCategoryWhite} style={{display:' inline'}}>
              Employee Information
            </p> */}
            <Button variant="contained" style={{float:'right'}} color="primary"  component={Link} to="/admin/addEmployee">
                Add Employee
            </Button>
            <button  onClick={props.showEmployee}>
                Show Employee
            </button>
          </CardHeader>
          <CardBody>
          <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="center" colSpan={2}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map(row => ( */}
            <TableRow>
              <TableCell component="th" scope="row">
                {props.fullName}
              </TableCell>
              <TableCell align="right">{props.currentCity}</TableCell>
              <TableCell align="right">{props.currentState}</TableCell>
              <TableCell align="right">{props.currentState}</TableCell>
              <TableCell align="right">{props.currentCountry}</TableCell>
              <TableCell align="right"><Button variant="contained" color="primary"  component={Link} to="/admin/editEmployee">
                Edit
            </Button></TableCell>
              <TableCell align="right"><Button variant="contained" color="primary"  component={Link} to="/admin/deleteEmployee">
                Delete
            </Button></TableCell>
            </TableRow>
          {/* ))} */}
        </TableBody>
      </Table> 
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
        </div>
    );
}
const mapStateToProps=state=>{
  return{
      // name:state.name,
      // age:state.age
      fullName: state.fullName,
      preferredName: state.preferredName,
      birthDate: state.birthDate,
      gender: state.gender,
      maritalStatus: state.maritalStatus,
      currentStreet1: state.currentStreet1,
      currentStreet2: state.currentStreet2,
      currentCity: state.currentCity,
      currentState: state.currentState,
      currentCountry: state.currentCountry,
      currentAddressProof: state.currentAddressProof,
      permanentStreet1: state.permanentStreet1,
      permanentStreet2: state.permanentStreet2,
      permanentCity: state.permanentCity,
      permanentState: state.permanentState,
      permanentCountry: state.permanentCountry,
      permanentAddressProof: state.permanentAddressProof,
      emergencyName1: state.emergencyName1,
      emergencyMobile1: state.emergencyMobile1,
      emergencyRelationship1: state.emergencyRelationship1,
      emergencyName2: state.emergencyName2,
      emergencyMobile2: state.emergencyMobile2,
      emergencyRelationship2: state.emergencyRelationship2,
      jobHireDate: state.jobHireDate,
      jobSalary: state.jobSalary,
      jobCurrentSalary: state.jobCurrentSalary,
      jobBond: state.jobBond,
      idProof: state.idProof,
      picture: state.picture,
      feedback: state.feedback
  }
}
const mapDispatchToProps=dispatch=>{
  return{
      showEmployee:()=>dispatch(showEmployee())
      
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Employee);

    {/* <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="center" colSpan={2}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right"><Button variant="contained" color="primary"  component={Link} to="/admin/editEmployee">
                Edit
            </Button></TableCell>
              <TableCell align="right"><Button variant="contained" color="primary"  component={Link} to="/admin/deleteEmployee">
                Delete
            </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
            {/* <Table
              tableHeaderColor="primary"
              tableHead={["Name", "State","Country", "City", "Salary"]}
              tableData={[
                // data
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            /> */}