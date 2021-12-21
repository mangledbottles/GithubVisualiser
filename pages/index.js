// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Navbar from "./Navbar.tsx";

import Box from "@mui/material/Box";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 2,
            marginTop: 4,
          },
        }}
      >
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
