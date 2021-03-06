import React from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import SignIn from './views/SignIn/SignIn'
import SignUp from './views/SignUp/SignUp'
import Admin from "./layouts/Admin.js"
import AddEmployee from 'views/Employee/Add'
import {Provider} from 'react-redux'
import Store from 'redux/Store'
import EmployeeView from 'views/Employee/View'

function App() {
  return (
    <Provider store={Store}>
    <Router>
      <Switch>
      <Route path="/admin" component={Admin} />
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/admin/addEmployee" component={AddEmployee}/>
        {/* <Route path="/admin/editEmployee/:id" component={AddEmployee}/> */}
        {/* <Route path="/admin/editEmployee" />
        <Route path="/admin/deleteEmployee" />
         */}
         {/* <Route path="/employee" component={EmployeeView} /> */}
        {/* <Redirect from="/" to="/admin/dashboard"/> */}
        <Redirect from="/" to="/signin"/>
      </Switch>
    </Router>
    </Provider>
  )
}

export default App
