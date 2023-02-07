import { Store } from "../Store";

export const saveData =(data) =>{
    return {
        type :'add',
        payload :data
    };
}

export const retriveData =(data) =>{
    return {
        type :'retrive',
    };
}


export const register = (requestData) =>{
    let registerData = Store.getState()?.register.users??[]

    return (dispatch)=>{
        registerData.push(requestData)
        dispatch(saveData(registerData))
      
    }

} 