export const initialState = {
    togglemodal: true,
}
const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_MODAL":
            return {
                ...state,
                togglemodal: !state.togglemodal
            }
        
        default: return {
            ...state
        }
    }
}
export default reducer;