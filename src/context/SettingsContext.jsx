import React, {
  createContext,
  useContext,
  useReducer,
  useEffect
} from "react";

import { settingsReducer, initialState } from "./settingsReducer";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("settings");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        dispatch({
          type: "LOAD_SETTINGS",
          payload: {
            ...initialState,
            ...parsed
          }
        });
      } catch (error) {
        console.log("Settings parse error:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state));
  }, [state]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
};