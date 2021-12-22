import * as React from "react";

// Import Material UI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Import components
import Navbar from "./Navbar.tsx";
import Profile from "./Profile.tsx";
import Repositories from "./Repositories.tsx";



export default function Home() {
  const [username, setUsername] = React.useState(['', '']);
  const [user, setUser] = React.useState([]);
  return (
    <div>
      <Navbar setUsername={setUsername} setUser={setUser} />
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
        <Profile username={username} user={user} />

{/* 
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
          </Grid> */}
        </Container>
      </Box>
    </div>
  );
}
