import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product?.id) return;

    dispatch(addToCart({ ...product }));
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 1,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4
        }
      }}
    >

      <Box
        sx={{
          height: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          p: 2
        }}
      >
        <img
          src={product?.image}
          alt={product?.title || "product"}
          loading="lazy"
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain"
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>

        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {product?.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, minHeight: 40 }}
        >
          {product?.description
            ? product.description.slice(0, 80)
            : "No description available"}
          ...
        </Typography>

        <Typography sx={{ mt: 2, fontWeight: 600 }}>
          ${product?.price ?? 0}
        </Typography>

      </CardContent>

      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >

        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          sx={{
            textTransform: "none",
            borderRadius: 2
          }}
        >
          Add to Cart
        </Button>

        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to={`/product/${product?.id}`}
          sx={{
            textTransform: "none",
            borderRadius: 2
          }}
        >
          View Details
        </Button>

      </Box>

    </Card>
  );
};

export default ProductCard;