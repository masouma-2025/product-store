import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from "@mui/material";

import { useSettings } from "./context/SettingsContext";

const App = () => {
  const [search, setSearch] = useState("");
  const { state } = useSettings();

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: state.mode,

        primary: {
          main: state.primaryColor || "#3b82f6"
        },

        background: {
          default: state.mode === "dark" ? "#0f172a" : "#f8fafc",
          paper: state.mode === "dark" ? "#1e293b" : "#ffffff"
        }
      },

      shape: {
        borderRadius: 14
      },

      typography: {
        fontFamily: `"Inter", "Roboto", "Arial", sans-serif`
      },

      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: "none"
            }
          }
        }
      }
    });
  }, [state.mode, state.primaryColor]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Navbar onSearch={setSearch} />

      <AppRoutes search={search} />
    </ThemeProvider>
  );
};

export default App;