import React from 'react';
import { Form,Field } from 'formik'
import {TextField} from 'formik-material-ui'
// import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {signinStyle} from 'assets/jss/team66/signinStyle'
import Box from '@material-ui/core/Box'
import Copyright from 'components/Copyright/Copyright'

function SignInForm(props) {
    const classes = signinStyle()
    return (
        <div>
            <Form className={classes.form}>
            <Field
              variant="outlined"
              margin="normal"
              id="email"
              type="email"
              label="Email Address"
              name="email"
              component={TextField}
              autoComplete="email"
              autoFocus
              fullWidth
            />
            <Field
              variant="outlined"
              margin="normal"
              component={TextField}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              fullWidth
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Form> 
          {/* <Box mt={8}>
            <Copyright />
          </Box>       */}
        </div>
    );
}

export default SignInForm;