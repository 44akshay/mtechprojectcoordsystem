export const initialState = {
    togglemodal: false,
    activemenu:null
}
const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return {
                ...state,
                togglemodal: !state.togglemodal
            }
        case "CHANGE_ACTIVE":
            return {
                ...state,
                activemenu:action.payload
            }
        
        default: return {
            ...state
        }
    }
}
export default reducer;