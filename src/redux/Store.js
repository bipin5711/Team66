import {createStore} from 'redux'
import EmployeeReducer from './EmployeeReducer'

const Store=createStore(EmployeeReducer)
export default Store