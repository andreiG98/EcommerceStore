import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/header";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
  },
  cardMedia: {
    paddingTop: "140%",
  },
}));

function Category({ posts, categories }) {
  const classes = useStyles();
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header categories={categories} />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
                <Grid item xs={6} sm={4} md={3}>
                  <Card className={classes.card} elevation={0}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={post.product_image[0].image}
                      alt={post.product_image[0].alt_text}
                    />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        RON{post.regular_price}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
  const posts = await req.json();

  const req_categories = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await req_categories.json();

  return {
    props: {
      posts,
      categories
    },
  };
}

export async function getStaticPaths() {
  // const req = await fetch(`http://127.0.0.1:8000/api/category`);
  // const data = await req.json();

  // const paths = data.map((category) => {
  //   return { params: { slug: category.slug } };
  // });

  // return {
  //   paths,
  //   fallback: true,
  // };

  return {
      paths: [{params: {slug: "boots"}}],
      fallback: true,
  }
}

export default Category;
