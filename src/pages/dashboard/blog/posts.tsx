import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container, Stack, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { IBlogPost } from '../../../@types/blog';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import { SkeletonPostDetails, SkeletonPostItem } from '../../../components/skeleton';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../../sections/@dashboard/blog';
import axiosInstance2 from 'src/utils/axios2';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

BlogPostsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogPostsPage() {
  const { themeStretch } = useSettingsContext();

  const [posts, setPosts] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);

  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = applySortBy(posts, sortBy);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/articles-author/');
      setPosts(response.data.posts);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Head>
        <title> Blog: Posts | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Blog"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Blog',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: 'Posts',
            },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.blog.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Post
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack>

        {loadingPost && (
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
          >
            {[...Array(4)].map(() => (
              <SkeletonPostDetails />
            ))}
          </Box>
        )}

        <Grid container spacing={3}>
          {!!sortedPosts.length &&
            sortedPosts.map((post, index) =>
              post ? (
                <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                  <BlogPostCard post={post} index={index} isDashboard />
                </Grid>
              ) : (
                <SkeletonPostItem key={index} />
              )
            )}
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applySortBy = (posts: IBlogPost[], sortBy: string) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};