import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputBase,
  IconButton,
  Badge,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import {
  ShoppingCart,
  Home,
  Search,
  DarkMode,
  LightMode,
  Menu,
  Settings
} from "@mui/icons-material";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSettings } from "../context/SettingsContext";

const Navbar = ({ onSearch }) => {
  const location = useLocation();
  const { state, dispatch } = useSettings();
  const items = useSelector((state) => state.cart.items || []);

  const [open, setOpen] = useState(false);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider"
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ minHeight: 70 }}>

            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              onClick={() => setOpen(true)}
            >
              <Menu />
            </IconButton>

            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                fontWeight: 800,
                fontSize: 20,
                color: "text.primary"
              }}
            >
              Urban Store
            </Typography>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: 3,
                gap: 1
              }}
            >
              <IconButton
                component={Link}
                to="/"
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/")
                    ? "action.selected"
                    : "transparent"
                }}
              >
                <Home />
              </IconButton>

              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive("/cart")
                    ? "action.selected"
                    : "transparent"
                }}
              >
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 0.6,
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: 420,
                  backgroundColor: "action.hover",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "0.3s",
                  "&:focus-within": {
                    borderColor: "primary.main",
                    backgroundColor: "background.paper"
                  }
                }}
              >
                <Search sx={{ mr: 1, color: "text.secondary" }} />

                <InputBase
                  placeholder="Search products..."
                  onChange={(e) => onSearch(e.target.value)}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", ml: "auto", gap: 1 }}>

              <IconButton
                component={Link}
                to="/settings"
                sx={{ borderRadius: 2 }}
              >
                <Settings />
              </IconButton>

              <IconButton
                onClick={() =>
                  dispatch({ type: "TOGGLE_MODE" })
                }
                sx={{
                  borderRadius: 2,
                  backgroundColor: "action.hover"
                }}
              >
                {state.mode === "light" ? (
                  <DarkMode />
                ) : (
                  <LightMode />
                )}
              </IconButton>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }}>

          <List>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/" onClick={() => setOpen(false)}>
                <Home sx={{ mr: 1 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/cart" onClick={() => setOpen(false)}>
                <ShoppingCart sx={{ mr: 1 }} />
                <ListItemText primary={`Cart (${totalItems})`} />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/settings" onClick={() => setOpen(false)}>
                <Settings sx={{ mr: 1 }} />
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>

          </List>

        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;