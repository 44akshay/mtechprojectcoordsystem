export const authInitialState={
   user:null
}
const authReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            console.log("Logging in with payload:", action.payload);
            return { 
                user:action.payload
            }
        case "LOGOUT":
            return {
                    user:null
                }
            
        default: return{
            ...state
        }
    }
}
export default authReducer;