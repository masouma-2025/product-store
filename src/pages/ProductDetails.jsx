import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Skeleton,
  Rating,
  IconButton
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { getProductById } from "../api/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("likes") || "[]");
    setLiked(saved.includes(id));
  }, [id]);

  const rating = useMemo(() => {
    const seed = parseInt(id, 10) || 1;
    return ((seed % 3) + 3).toFixed(1);
  }, [id]);

  const toggleLike = () => {
    const saved = JSON.parse(localStorage.getItem("likes") || "[]");

    const updated = liked
      ? saved.filter((item) => item !== id)
      : [...saved, id];

    localStorage.setItem("likes", JSON.stringify(updated));
    setLiked(!liked);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id)
  });

  if (isLoading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Skeleton variant="rectangular" width={350} height={350} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="60%" height={40} />
              <Skeleton width="40%" height={30} />
              <Skeleton width="90%" height={20} />
            </Box>
          </Box>
        </Card>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography color="error">Failed to load product</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ p: 3, borderRadius: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>

            <Box sx={{ flex: "1 1 300px", textAlign: "center" }}>
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  maxWidth: 360,
                  transition: "0.3s",
                  cursor: "zoom-in"
                }}
              />
            </Box>

            <Box sx={{ flex: "1 1 300px" }}>
              <Typography variant="h4" fontWeight={700}>
                {data.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Rating value={Number(rating)} precision={0.5} readOnly />
                <Typography sx={{ ml: 1 }}>({rating})</Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{ mt: 2, fontWeight: 700, color: "primary.main" }}
              >
                ${data.price}
              </Typography>

              <Typography sx={{ mt: 3, color: "text.secondary" }}>
                {data.description}
              </Typography>

              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => dispatch(addToCart(data))}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>

                <IconButton
                  onClick={toggleLike}
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    color: liked ? "red" : "inherit",
                    transition: "0.2s",
                    "&:active": {
                      transform: "scale(0.9)"
                    }
                  }}
                >
                  {liked ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>

              <Button
                sx={{ mt: 2 }}
                variant="outlined"
                fullWidth
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;