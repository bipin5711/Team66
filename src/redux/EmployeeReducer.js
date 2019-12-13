const initialState={
    fullName: 'gf',
    preferredName: '',
    birthDate: null,
    gender: '',
    maritalStatus: '',
    currentStreet1: '',
    currentStreet2: '',
    currentCity: '',
    currentState: '',
    currentCountry: '',
    currentAddressProof: [],
    permanentStreet1: '',
    permanentStreet2: '',
    permanentCity: '',
    permanentState: '',
    permanentCountry: '',
    permanentAddressProof: [],
    emergencyName1: '',
    emergencyMobile1: '',
    emergencyRelationship1: '',
    emergencyName2: '',
    emergencyMobile2: '',
    emergencyRelationship2: '',
    jobHireDate: null,
    jobSalary: '',
    jobCurrentSalary: '',
    jobBond: '',
    idProof: [],
    picture: [],
    feedback: ''
}
const EmployeeReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SHOW_EMPLOYEE":
            return state
        case "ADD_EMPLOYEE":
            return{
               ...state,fullName:action.payload
            }
            default:
                return state
    }
}
export default EmployeeReducer