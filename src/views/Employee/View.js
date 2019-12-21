import React, { useState, useContext, useEffect } from 'react';
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
// import Button from '@material-ui/core/Button'
import Button from "components/CustomButtons/Button.js";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { showEmployee } from 'redux/EmployeeAction'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
// import ExpansionPanel from 'components/ExpansionPanel/ExpansionPanel'
// import Modal from 'components/Modal/Modal';
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

  },
  filelink:{
    // width:'100%',
    // // backgroundColor:'#eeeeee',
    color:'black',
    // height:'20px',
    // width:'auto',
    // padding:'5px 20px',
    // marginRight:'10px',
    // borderRadius:'1%'
    

  }
  // button:{
  //     flexDirection: 'row', 
  //     justifyContent: 'flex-end',
  //     alignSelf: 'flex-end',
  //     alignItems: 'flex-end'
  // }
};

const useStyles = makeStyles(styles);


function Employee(props) {
  const classes = useStyles();
  const data = useSelector(state => state)
  console.log(data)
  const dispatch = useDispatch();
  let pictureBlob = new Blob(data.picture, { type: 'image/jpeg' });
  const pictureBlobUrl = URL.createObjectURL(pictureBlob)

  useEffect(() => {
    // dispatch({ type:'SHOW_EMPLOYEE' })
    dispatch(showEmployee())

  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={9}>
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
              {/* <ExpansionPanel orderstatus="Inactive" createddate="dsada" ordernumber="12">
                    fdsd
          </ExpansionPanel>
          <ExpansionPanel orderstatus="active" createddate="dsada" ordernumber="12">
                    fdsd
          </ExpansionPanel> */}
              {/* <Modal orderstatus="active" createddate="dsada" ordernumber="12">dghj</Modal> */}

              {data.fullName != "" ?
                <div>
                  <GridContainer spacing={2}>
                    <GridItem xs={12} sm={5} md={4}>
                      {/* <Avatar alt="Remy Sharp" src={data.image} height="300px" width="400px" /> */}
                      {/* {data.image ? */}
                      <img height="auto" width="100%" src={pictureBlobUrl} style={{ borderRadius: '50%', padding: "30", maxWidth: '300px' }} />
                      {/* : ""} */}
                    </GridItem>
                    <GridItem xs={12} sm={5} md={6}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow colSpan={2}>
                            <Typography className={classes.tableRow} variant="h6" component="h2">
                              Employee Information
                              </Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Full Name:</TableCell>
                            <TableCell className={classes.tableCell} align="left">{data.fullName ? data.fullName : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>BirthDate:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.birthDate ? data.birthDate : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Gender:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.gender ? data.gender : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Marital Status:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.maritalStatus ? data.maritalStatus : "Not Set"}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow colSpan={2}> <Typography className={classes.tableRow} variant="h6" component="h2">
                            Current Address</Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Street 1:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.currentStreet1 ? data.currentStreet1 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Street 2:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.currentStreet2 ? data.currentStreet2 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>City:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.currentCity ? data.currentCity : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>State:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.currentState ? data.currentState : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Country:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.currentCountry ? data.currentCountry : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Current Address Proof:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                              {
                                data.currentAddressProof.map(file => {
                                  let currentAddressProofBlob = new Blob([file], { type: 'application/pdf' });
                                  var currentAddressUrl = (URL.createObjectURL(currentAddressProofBlob))
                                  return (
                                    <a className={classes.filelink} href={currentAddressUrl} target="_blank">{file.name} </a>
                                  )
                                })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow> <Typography className={classes.tableRow} variant="h6" component="h2">
                            Permanent Address</Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Street 1</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.permanentStreet1 ? data.permanentStreet1 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Street 2</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.permanentStreet2 ? data.permanentStreet2 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>City</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.permanentCity ? data.permanentCity : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>State</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.permanentState ? data.permanentState : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Country</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.permanentCountry ? data.permanentCountry : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Permanent Address Proof:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                              {
                                data.permanentAddressProof.map(file => {
                                  let permanentAddressProofBlob = new Blob([file], { type: 'application/pdf' });
                                  var permanentAddressUrl = (URL.createObjectURL(permanentAddressProofBlob))
                                  return (
                                    <a href={permanentAddressUrl} target="_blank">{file.name} </a>
                                  )
                                })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow colSpan={2}> <Typography className={classes.tableRow} variant="h6" component="h2">
                            Emergency Contact</Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Name:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.emergencyName1 ? data.emergencyName1 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Mobile:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.emergencyMobile1 ? data.emergencyMobile1 : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>RealtionShip:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.emergencyRelationship1 ? data.emergencyRelationship1 : "Not Set"}</TableCell>
                          </TableRow>

                        </TableBody>
                      </Table>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow colSpan={2}> <Typography className={classes.tableRow} variant="h6" component="h2">
                            Job Details</Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Hire Date:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.jobHireDate ? data.jobHireDate : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Salary:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.jobSalary ? data.jobSalary : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Current Salary:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.jobCurrentSalary ? data.jobCurrentSalary : "Not Set"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.tableCell}>Bond:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">{data.jobBond ? data.jobBond : "Not Set"}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow colSpan={2}> <Typography className={classes.tableRow} variant="h6" component="h2">
                            Id Proof</Typography>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell} style={{ width: '150px' }}>Id Proof:</TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                              {
                                data.idProof.map(file => {
                                  let idProofBlob = new Blob([file], { type: 'application/pdf' });
                                  var idProofUrl = (URL.createObjectURL(idProofBlob))
                                  return (
                                    <a href={idProofUrl} target="_blank">{file.name} </a>
                                  )
                                })}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </GridItem>
                  </GridContainer>
                </div>
                : "No Data Available"}

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