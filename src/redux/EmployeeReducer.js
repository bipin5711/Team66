const initialState = {
    fullName: [],
    preferredName: [],
    birthDate: [],
    gender: [],
    maritalStatus: [],
    currentStreet1: [],
    currentStreet2: [],
    currentCity: [],
    currentState: [],
    currentCountry: [],
    currentAddressProof: [],
    permanentStreet1: [],
    permanentStreet2: [],
    permanentCity: [],
    permanentState: [],
    permanentCountry: [],
    permanentAddressProof: [],
    emergencyName1: [],
    emergencyMobile1: [],
    emergencyRelationship1: [],
    emergencyName2: [],
    emergencyMobile2: [],
    emergencyRelationship2: [],
    jobHireDate: [],
    jobSalary: [],
    jobCurrentSalary: [],
    jobBond: [],
    idProof: [],
    picture: [],
    feedback: []
}
const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_EMPLOYEE":
            return state
        case "ADD_EMPLOYEE":
            return {
                ...state,
                fullName: action.payload.fullName,
                preferredName: action.payload.preferredName,
                birthDate: action.payload.birthDate,
                gender: action.payload.gender,
                maritalStatus: action.payload.maritalStatus,
                currentStreet1: action.payload.currentStreet1,
                currentStreet2: action.payload.currentStreet2,
                currentCity: action.payload.currentCity,
                currentState: action.payload.currentState,
                currentCountry: action.payload.currentCountry,
                currentAddressProof: action.payload.currentAddressProof,
                permanentStreet1: action.payload.permanentStreet1,
                permanentStreet2: action.payload.permanentStreet2,
                permanentCity: action.payload.permanentCity,
                permanentState: action.payload.permanentState,
                permanentCountry: action.payload.permanentCountry,
                permanentAddressProof: action.payload.permanentAddressProof,
                emergencyName1: action.payload.emergencyName1,
                emergencyMobile1: action.payload.emergencyMobile1,
                emergencyRelationship1: action.payload.emergencyRelationship1,
                emergencyName2: action.payload.emergencyName2,
                emergencyMobile2: action.payload.emergencyMobile2,
                emergencyRelationship2: action.payload.emergencyRelationship2,
                jobHireDate: action.payload.jobHireDate,
                jobSalary: action.payload.jobSalary,
                jobCurrentSalary: action.payload.jobCurrentSalary,
                jobBond: action.payload.jobBond,
                idProof: action.payload.idProof,
                picture: action.payload.picture,
                feedback: action.payload.feedback
            }
        default:
            return state
    }
}
export default EmployeeReducer