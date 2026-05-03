import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  removeFromCart,
  increaseQty,
  decreaseQty
} from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items || []);
  const navigate = useNavigate();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>

      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      {items.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h6">
            Your cart is empty 
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Add some products to continue shopping
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr"
            },
            gap: 3
          }}
        >

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            {items.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6
                  }
                }}
              >

                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    width: 90,
                    height: 90,
                    objectFit: "contain",
                    mr: 2
                  }}
                />

                <CardContent sx={{ flex: 1 }}>

                  <Typography fontWeight={600} noWrap>
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    ${item.price}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>

                    <Button
                    size="small"
                    variant="outlined"
                    disabled={item.quantity <= 1}
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </Button>

                    <Typography>{item.quantity}</Typography>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </Button>

                  </Box>

                </CardContent>

                <IconButton
                  onClick={() => dispatch(removeFromCart(item.id))}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>

              </Card>
            ))}

          </Box>

          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "background.paper",
              boxShadow: 2,
              height: "fit-content",
              position: "sticky",
              top: 20
            }}
          >

            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Total Items</Typography>
              <Typography>{totalItems}</Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography fontWeight={600}>Total Price</Typography>
              <Typography fontWeight={700}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/checkout")}
                >
                Checkout
            </Button>

          </Box>

        </Box>
      )}

    </Container>
  );
};

export default Cart;