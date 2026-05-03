export const initialState = {
  mode: "light",
  view: "grid",
  language: "en",
  primaryColor: "#3b82f6"
};

export function settingsReducer(state, action) {
  switch (action.type) {

    case "TOGGLE_MODE":
      return {
        ...state,
        mode: state.mode === "light" ? "dark" : "light"
      };

    case "SET_VIEW":
      return {
        ...state,
        view: action.payload
      };

    case "SET_COLOR":
      return {
        ...state,
        primaryColor: action.payload
      };

    // 💾 load safe settings
    case "LOAD_SETTINGS":
      return {
        ...state,
        ...action
      };

    case "RESET_SETTINGS":
      return {
        ...initialState
      };

    default:
      return state;
  }
}