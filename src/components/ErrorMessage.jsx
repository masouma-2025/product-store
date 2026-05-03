import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";

const ErrorMessage = ({ message = "Something went wrong", onRetry }) => {
  return (
    <Container sx={{ textAlign: "center", mt: 6 }}>

      <Box
        sx={(theme) => ({
          padding: 3,
          border: `1px solid ${theme.palette.error.main}`,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(244,67,54,0.08)"
              : "#fff5f5"
        })}
      >

        <Typography variant="h6" color="error">
          ⚠️ Error
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          {message}
        </Typography>

        {onRetry && (
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => typeof onRetry === "function" && onRetry()}
          >
            Retry
          </Button>
        )}

      </Box>

    </Container>
  );
};

export default ErrorMessage;