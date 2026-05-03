import React, { useState, useMemo } from "react";
import { Container, Button, Box, Typography } from "@mui/material";

import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";

const categories = [
  "all",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

const Home = ({ search = "", mode = "light" }) => {
  const { data, isLoading, isError } = useProducts();
  const [category, setCategory] = useState("all");

  const products = Array.isArray(data) ? data : [];

  const filteredData = useMemo(() => {
    return products.filter((product) => {
      if (!product) return false;

      const matchSearch = (product.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        px: { xs: 2, sm: 3 },
        overflowX: "hidden"
      }}
    >
      <Box
        sx={{
          mb: 6,
          p: { xs: 4, md: 7 },
          borderRadius: 5,
          textAlign: "center",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #0b1220, #111827, #1f2937)"
              : "linear-gradient(120deg, #7c3aed, #2563eb, #06b6d4, #16f9db)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          isolation: "isolate"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
            top: -80,
            left: -80,
            filter: "blur(60px)",
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: 260,
            height: 260,
            background: "rgba(0,0,0,0.15)",
            borderRadius: "50%",
            bottom: -90,
            right: -60,
            filter: "blur(70px)",
            zIndex: 0
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              letterSpacing: 1,
              fontSize: { xs: "1.8rem", md: "2.6rem" }
            }}
          >
            Elevate Your Everyday Style
          </Typography>

          <Typography
            sx={{
              mt: 2,
              opacity: 0.9,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              maxWidth: 600,
              mx: "auto"
            }}
          >
            Discover curated fashion, electronics & lifestyle essentials —
            all in one place with modern design and best value.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1
        }}
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setCategory(cat)}
            sx={{
              px: 2,
              py: 0.8,
              borderRadius: 20,
              textTransform: "capitalize",
              fontSize: "0.85rem",
              fontWeight: 500,
              border: "1px solid",
              borderColor: "divider",
              transition: "0.25s",
              background:
                category === cat
                  ? "linear-gradient(135deg, #6366f1, #3b82f6)"
                  : "transparent",
              color: category === cat ? "#fff" : "text.primary",
              "&:hover": {
                background:
                  category === cat
                    ? "linear-gradient(135deg, #4f46e5, #2563eb)"
                    : "action.hover"
              }
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>

      {isLoading && <Loader text="Loading products..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load products. Please check your internet connection."
          onRetry={() => window.location.reload()}
        />
      )}

      {!isLoading && !isError && (
        <>
          <Typography
            sx={{ mb: 2, textAlign: "center", opacity: 0.7 }}
          >
            {filteredData.length} products found
          </Typography>

          {filteredData.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)"
                },
                gap: 3,
                width: "100%"
              }}
            >
              {filteredData.map((product) => (
                <Box key={product.id} sx={{ minWidth: 0 }}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", mt: 8 }}>
              <Typography variant="h6">
                No products found 😢
              </Typography>
              <Typography color="text.secondary">
                Try changing search or category
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;