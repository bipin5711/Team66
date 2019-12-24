import React, { useState, useContext, useEffect } from 'react';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button'
import Button from "components/CustomButtons/Button.js";
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showEmployee } from 'redux/EmployeeAction'
import api from '../../lib/axios';
import View from 'views/Employee/View'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

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
    display: 'inline-block',
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  table: {
    border: 0,

  },
  tableCell: {
    border: 0,
    padding: 3,
    // minWidth:'auto',
    // width:'140px'
    // maxWidth:'5%'
  },
  tableRow: {
    marginTop: 25,
    marginBottom: 5,
  },
  addBtn: {
    float: 'right',
    display: 'inline',
    border:'1px solid white',
    zIndex:'1px',
    margin:'-5px 0px'

  }
};

const useStyles = makeStyles(styles);



function EmployeeList(props) {
  const classes = useStyles();
  const [employeeData,setEmployeeData]=useState([])
  const data = useSelector(state => state)
//   console.log(data)
  const dispatch = useDispatch();
  
  useEffect(() => {
    // dispatch({ type:'SHOW_EMPLOYEE' })
    dispatch(showEmployee())
    const s=api.get('employees').then(res=>{
        console.log("ds",res.data.data)
        console.log("ds1",res)
        setEmployeeData(res.data.data)
    }).catch(err=>{console.log("err",err)})
    console.log("ss",s)
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            {/* in cardheader we can use plain attribute */}

            <CardHeader color="primary">
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}> 
                  <h4 className={classes.cardTitleWhite} style={{ display: 'inline' }}>
                    Employee Details
            </h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <Button className={classes.addBtn} color="transparent" component={Link} to="/admin/addEmployee">
                    Add Employee
            </Button>
                </GridItem></GridContainer>
            </CardHeader>
            <CardBody style={{minHeight:'200px'}}>
              {/* {data.fullName != "" ? */}
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      {/* <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>BirthDate</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Marital Status</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Hire Date</TableCell>
                            <TableCell>Current Salary</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                           { employeeData.map(data=>{
                                return(
                                    <TableRow>
                                        <TableCell component="th" scope="row">{data.name}</TableCell>
                                        <TableCell component="th" scope="row">{data.birthDate}</TableCell>
                                        <TableCell component="th" scope="row">{data.gender}</TableCell>
                                        <TableCell component="th" scope="row">{data.maritalStatus}</TableCell>
                                        <TableCell component="th" scope="row">{data.currentAddress.city}</TableCell>
                                        <TableCell component="th" scope="row">{data.currentAddress.state}</TableCell>
                                        <TableCell component="th" scope="row">{data.currentAddress.country}</TableCell>
                                        <TableCell component="th" scope="row">{data.hireDate}</TableCell>
                                        <TableCell component="th" scope="row">{data.currentSalary}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        </TableBody>
                      </Table> */}
                      <Table
              tableHeaderColor="primary"
              tableHead={["Id","Name","BirthDate","Gender","Marital Status","City","State","Country","Hire Date","Current Salary","Edit","View","Delete"]}
              tableData={
                employeeData.map(employee=>{
                   return([employee.id,employee.name,employee.birthDate,employee.gender,employee.maritalStatus
                    ,employee.currentAddress.city,employee.currentAddress.state,employee.currentAddress.country
                   ,employee.hireDate,employee.currentSalary,<EditIcon/>,<NavLink to={`/admin/employee/${employee.id}`}><VisibilityIcon/></NavLink>,<DeleteIcon/>])
                })
                // [props.name.toUpperCase(),props.description.toUpperCase(),props.category.toUpperCase(),props.price,props.expirydate===""?"":format(props.expirydate, 'dd/MM/yyyy'),props.image===""?null:<img height="100px" width="100px" src={props.image}/>],
              }
            />
                    </GridItem>
                  </GridContainer>
                </div>
                {/* : "No Data Available"} */}

            </CardBody>
          </Card>
        </GridItem>

      </GridContainer>
    </div>
  );
}

export default EmployeeList;


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