import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart?.items || []);

  const totalPrice = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [finalTotal, setFinalTotal] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    payment: "card"
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone must be 10-15 digits";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (items.length === 0) return;

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const fakeOrderId =
        "ORD-" + Math.floor(Math.random() * 100000);

      setOrderId(fakeOrderId);
      setFinalTotal(totalPrice);
      setOrderSuccess(true);
      setLoading(false);

      dispatch(clearCart());
    }, 1500);
  };

  if (orderSuccess) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card
          sx={{
            width: "100%",
            p: 4,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            background: "linear-gradient(135deg, #ffffff, #f8fafc)"
          }}
        >
          <Box sx={{ fontSize: 60, mb: 2 }}>🎉</Box>

          <Typography variant="h4" fontWeight={800}>
            Order Successful
          </Typography>

          <Typography sx={{ mt: 1, color: "text.secondary" }}>
            Your purchase has been completed successfully
          </Typography>

          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              background: "#f1f5f9"
            }}
          >
            <Typography fontSize={14} color="text.secondary">
              Order ID
            </Typography>
            <Typography fontWeight={700}>
              {orderId}
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography fontSize={14} color="text.secondary">
              Total Paid
            </Typography>
            <Typography
              fontWeight={800}
              fontSize={22}
              color="primary.main"
            >
              ${Number(finalTotal).toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 4,
              py: 1.2,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600
            }}
            href="/"
          >
            Continue Shopping
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3
        }}
      >
        <Card>
          <CardContent>
            <Typography fontWeight={600} sx={{ mb: 2 }}>
              Shipping Information
            </Typography>

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 3 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600}>
              Payment Method
            </Typography>

            <RadioGroup
              name="payment"
              value={form.payment}
              onChange={handleChange}
            >
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Card"
              />
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label="Cash on Delivery"
              />
            </RadioGroup>
          </CardContent>
        </Card>

        <Card sx={{ p: 2, height: "fit-content" }}>
          <Typography fontWeight={700} sx={{ mb: 2 }}>
            Order Summary
          </Typography>

          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1
              }}
            >
              <Typography fontSize={14} noWrap>
                {item.title}
              </Typography>
              <Typography fontSize={14}>
                x{item.quantity}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography fontWeight={700}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading || items.length === 0}
            onClick={handleOrder}
          >
            {loading ? (
              <CircularProgress size={22} />
            ) : (
              "Place Order"
            )}
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Checkout;