export const showEmployee=()=>{
    return {
        type:'SHOW_EMPLOYEE'
    }
}

export const addEmployee=(employee)=>{
    return {
        type:'ADD_EMPLOYEE',
        payload:employee
    }
}