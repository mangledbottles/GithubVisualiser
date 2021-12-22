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
  const [repositories, setRepositories] = React.useState([{}, '']);
  return (
    <div>
      <Navbar setUsername={setUsername} setUser={setUser} setRepositories={setRepositories} />
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 2,
            marginTop: 4,
          },
        }}
      >
        {/* Grid to take all available */}
        <Grid sx={{ flexGrow: 0 }} width="100vw" container spacing={2}>
          <Profile username={username} user={user} />
          <Repositories repositories={repositories} />
        </Grid>
        {/* </Container> */}
      </Box>
    </div>
  );
}
