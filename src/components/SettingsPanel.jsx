import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  TextField
} from "@mui/material";

import { useSettings } from "../context/SettingsContext";

const SettingsPanel = () => {
  const { state, dispatch } = useSettings();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6, px: 2 }}>

      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 5,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "#0f172a"
              : "#ffffff"
        }}
      >

        <Typography variant="h4" fontWeight={800}>
          ⚙️ Settings Center
        </Typography>

        <Typography variant="body2" color="text.secondary" mt={1}>
          Customize your shopping experience
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600}>
            Theme Mode
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={state.mode === "dark"}
                onChange={() =>
                  dispatch({ type: "TOGGLE_MODE" })
                }
              />
            }
            label={state.mode === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600} mb={1}>
            Product Layout
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant={state.view === "grid" ? "contained" : "outlined"}
              onClick={() =>
                dispatch({ type: "SET_VIEW", payload: "grid" })
              }
            >
              Grid
            </Button>

            <Button
              fullWidth
              variant={state.view === "list" ? "contained" : "outlined"}
              onClick={() =>
                dispatch({ type: "SET_VIEW", payload: "list" })
              }
            >
              List
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography fontWeight={600} mb={1}>
            Primary Color
          </Typography>

          <TextField
            type="color"
            value={state.primaryColor}
            onChange={(e) =>
              dispatch({
                type: "SET_COLOR",
                payload: e.target.value
              })
            }
            fullWidth
          />
        </Box>

        <Divider sx={{ my: 3 }} />

]        <Button
          fullWidth
          size="large"
          variant="contained"
          color="error"
          onClick={() =>
            dispatch({ type: "RESET_SETTINGS" })
          }
        >
          Reset All Settings
        </Button>

      </Paper>
    </Box>
  );
};

export default SettingsPanel;