import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { Formik } from 'formik'
import { fromEventPattern } from 'rxjs'
import { useHistory } from "react-router-dom"
import CardHeader from 'components/Card/CardHeader'
import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import SignInForm from 'components/SignInForm/SignInForm'
import {signinStyle} from 'assets/jss/team66/signinStyle'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter valid Email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .required('Required')
     
  });
export default function SignIn() {
  
  const classes = signinStyle()
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
              Sign In
            </Typography>
          </CardHeader>
          <CardBody>
          <Formik
          initialValues={{
            email:'',
            password:''
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values.email)
            console.log(values.password)
            if(values.email === "admin@gmail.com" && values.password === "admin123"){
              history.push({
              pathname: '/admin'
            }
            )}}} 
            component={SignInForm}
          >
          {/* {({ errors,values, touched ,handleChange, handleSubmit}) => (
          
          <SignInForm/>

            )} */}
      
          </Formik>
         </CardBody>
         </Card>
      </div>
      
    </Container>
  )
}