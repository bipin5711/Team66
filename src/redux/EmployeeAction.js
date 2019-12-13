export const showEmployee=()=>{
    return {
        type:'SHOW_EMPLOYEE'
    }
}

export const addEmployee=(employeeData)=>{
    return {
        type:'ADD_EMPLOYEE',
        payload:employeeData
    }
}