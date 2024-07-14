import { lazy, Suspense } from 'react';
import { Box, Skeleton, Grid, Paper, Typography, Divider } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import * as v from 'valibot';
import { Navbar } from '@/components/common/Navbar';
const ProductsPage = lazy(() => import('@/pages/products/ProductsPage'));

const Category = v.union([
  v.literal('supervivencia'),
  v.literal('accion'),
  v.literal('disparos'),
  v.literal('rol'),
  v.literal('musica'),
  v.literal('guerra'),
  v.literal('deporte'),
  v.literal('conduccion'),
  v.literal('multijugador'),
  v.literal('infantil'),
  v.literal('estrategia'),
  v.literal('simulacion'),
  v.literal('arcade'),
]);

const Platform = v.union([
  v.literal('PlayStation 3'),
  v.literal('PlayStation 4'),
  v.literal('PlayStation 5'),
  v.literal('Steam'),
]);

const ItemFilters = v.object({
  category: v.optional(v.array(Category)),
  page: v.optional(v.string(), '1'),
  platform: v.optional(Platform),
  maxPrice: v.optional(v.string()),
  minPrice: v.optional(v.string()),
  sale: v.optional(v.boolean()),
  search: v.optional(v.string()),
});

export type ItemFilters = v.InferOutput<typeof ItemFilters>;

export const Route = createFileRoute('/product/')({
  validateSearch: (search) => v.parse(ItemFilters, search),
  component: Product,
});

const SkeletonProductsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ padding: 2 }}>
        <Skeleton
          variant="text"
          width={300}
          height={40}
          sx={{ marginBottom: 2 }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">
                <Skeleton width={150} />
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ marginBottom: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ marginBottom: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ marginBottom: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={40}
                sx={{ marginBottom: 2 }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6">
              <Skeleton width={250} />
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                  <Paper sx={{ padding: 2 }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={200}
                      sx={{ marginBottom: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="80%"
                      height={30}
                      sx={{ marginBottom: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={30}
                      sx={{ marginBottom: 1 }}
                    />
                    <Skeleton variant="rectangular" width="60%" height={40} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

function Product() {
  const { category, maxPrice, minPrice, page, platform, sale, search } =
    Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <Suspense fallback={<SkeletonProductsPage />}>
      <ProductsPage
        category={category}
        maxPrice={maxPrice}
        minPrice={minPrice}
        page={page}
        platform={platform}
        sale={sale}
        search={search}
        navigate={navigate}
      />
    </Suspense>
  );
}
