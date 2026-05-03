import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const Loader = ({ text = "Loading products..." }) => {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(2,6,23,0.6))",
        backdropFilter: "blur(10px)",
        zIndex: 9999
      }}
    >
      <Box
        sx={{
          width: 320,
          height: 200,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          color: "#fff",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          animation: "pulse 1.8s infinite"
        }}
      >
        <CircularProgress
          size={55}
          thickness={4}
          sx={{ color: "#60a5fa" }}
        />

        <Typography fontWeight={600} sx={{ letterSpacing: 0.5 }}>
          {text}
        </Typography>

        {/* FIXED: real animated dots */}
        <Typography
          variant="caption"
          sx={{
            opacity: 0.7,
            "&::after": {
              content: '"..."',
              animation: "dots 1.5s infinite steps(3, end)"
            }
          }}
        >
          Please wait
        </Typography>

        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.03); }
              100% { transform: scale(1); }
            }

            @keyframes dots {
              0% { content: ""; }
              33% { content: "."; }
              66% { content: ".."; }
              100% { content: "..."; }
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default Loader;