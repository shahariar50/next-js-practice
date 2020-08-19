import axios from "axios";
import { Container, Typography, Grid } from "@material-ui/core";

export default function Post({ data }) {
  return (
    <Container>
      <Grid>
        <Typography component="h4" variant="h4">
          {data.title}
        </Typography>
        <Typography variant="body2">{data.body}</Typography>
      </Grid>
    </Container>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get("http://jsonplaceholder.typicode.com/posts");
  const paths = data.map((p) => ({
    params: {
      id: `${p.id}`,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `http://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  return {
    props: {
      data,
    },
  };
}
