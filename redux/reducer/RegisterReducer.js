const initialState ={
    users: []
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case 'add': {
            return{
                ...state,
                users : action.payload,
            }
        };
        case 'retrive':{
            return {
                ...state
            }
        };
        default:
            return state;
    }
}