import React from 'react';
import { Form,Field } from 'formik'
import {TextField} from 'formik-material-ui'
// import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Link from '@material-ui/core/Link'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {signupStyle} from 'assets/jss/team66/signupStyle'
import Box from '@material-ui/core/Box'
import Copyright from 'components/Copyright/Copyright'

function SignUpForm(props) {
    const classes = signupStyle()
    return (
        <div>
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoComplete="firstname"
                    name="firstName"
                    variant="outlined"
                    component={TextField}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    variant="outlined"
                    // required
                    component={TextField}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastname"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    // required
                    component={TextField}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    // required
                    component={TextField}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    fullWidth
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </div>
    );
}

export default SignUpForm;