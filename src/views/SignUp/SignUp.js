import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Formik } from 'formik'
import { useHistory } from "react-router-dom"
import CardHeader from 'components/Card/CardHeader'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import SignUpForm from 'components/SignUpForm/SignUpForm'
import {signupStyle} from 'assets/jss/team66/signupStyle'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    firstName:Yup.string()
        .min(2,'too Short!')
        .max(50,'too Long!')
        .required('Required'),
    lastName:Yup.string()
        .min(2,'too Short!')
        .max(50,'too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Enter valid Email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .required('Required')
   
});
export default function SignUp() {
  const classes = signupStyle()
  let history = useHistory()
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Card>
          <CardHeader className={classes.cardheader} color="primary">
            {/* <Avatar className={classes.avatar} >
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody>
            <Formik
            initialValues={{
              firstName:'',
              lastName:'',
              email:'',
              password:''
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values.firstName+values.lastName+values.email+values.password)
              history.push({
                pathname: '/admin'
              })
            }} 
            component={SignUpForm}>
            {/* {({ errors,values, touched ,handleChange, handleSubmit}) => (
            
            <SignUpForm/>
            )} */}
        </Formik>
      </CardBody>
     </Card>
    </div>
  </Container>
  )
}