import React ,{ useState, useContext, useEffect } from 'react';
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
import { useSelector, useDispatch} from 'react-redux'
import { showEmployee} from 'redux/EmployeeAction'
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
 
  const classes = useStyles();
  const data=useSelector(state=>state)
  const dispatch = useDispatch();
  useEffect(()=>{
    // dispatch({ type:'SHOW_EMPLOYEE' })
    dispatch(showEmployee())
  },[])
  const rows = [
  //  employeeData.fullName==="undefined"?"":createData(employeeData.fullName,employeeData.fullName,employeeData.fullName,employeeData.fullName,employeeData.fullName)
    // createData('A', 'X', 'X', 'X', 43000),
    // createData('E', 'X', 'X', 'X', 60000),
    // createData('C', 'X', 'X', 'X', 43000),
    // createData('G', 'X', 'X', 'X', 39000),
  ];
 
    return (
        <div>
            <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {/* in cardheader we can use plain attribute */}
          <CardHeader color="primary"> 
            <h4 className={classes.cardTitleWhite}>
            Employee Information
            </h4>
            {/* <p className={classes.cardCategoryWhite} style={{display:' inline'}}>
              Employee Information
            </p> */}
            <Button variant="contained" style={{float:'right'}} color="primary"  component={Link} to="/admin/addEmployee">
                Add Employee
            </Button>
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
                {data.fullName}
              </TableCell>
              <TableCell align="right">{data.currentCity}</TableCell>
              <TableCell align="right">{data.currentState}</TableCell>
              <TableCell align="right">{data.currentState}</TableCell>
              <TableCell align="right">{data.currentCountry}</TableCell>
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

export default Employee;

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