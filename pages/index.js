import * as React from "react";

// Import Material UI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Import components
import Navbar from "./Navbar.tsx";
import Profile from "./Profile.tsx";
import Repositories from "./Repositories.tsx";
import Graphs from "./Graphs.tsx";

export default function Home() {
  const [username, setUsername] = React.useState(["", ""]);
  const [user, setUser] = React.useState([]);
  const [repositories, setRepositories] = React.useState([{}, ""]);
  const [commits, setCommits] = React.useState([[], ""]);
  return (
    <div>
      <Navbar
        user={user}
        setUsername={setUsername}
        setUser={setUser}
        setRepositories={setRepositories}
      />

      <Typography variant="h4" component="h4">
        Graph commits per day
      </Typography>

      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 2,
            marginTop: 4,
          },
        }}
      >
        ;{/* Grid to take all available */}
        <Grid sx={{ flexGrow: 0 }} width="100vw" container spacing={2} xs={12}>
          <Profile username={username} user={user} />
          <Repositories repositories={repositories} setCommits={setCommits} />
          <Graphs commits={commits} />
        </Grid>
        {/* </Container> */}
      </Box>
    </div>
  );
}
