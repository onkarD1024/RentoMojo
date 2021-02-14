const initialState = {
  user_id: null,
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case "STORE_USERID":
      return {
        ...state,
        user_id: action.data.user_id,
      };

    default:
      return state;
  }
}
