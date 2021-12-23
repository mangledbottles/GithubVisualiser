import * as React from "react";

// Import Material UI components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import GitHubIcon from '@mui/icons-material/GitHub';

// Import TS Interfaces
import { Repository } from "../utils/interfaces/Repository.interface";
import { getCommitHistory } from "./api/Repositories";

// Import API
import * as API from "./api";

export default function Repositories({ repositories, setCommits }) {
  function getCommitHistory(username, repository) {
    API.Repositories.getCommitHistory(username, repository).then(commits => {
      console.log({ commits });
      let commitByDate = new Map();
      let commitHistory = [];
      commits.forEach(commit => {
        // Count amount of commits per date
        let commitDate = (commit.commit.author.date).split("T")[0];
        if (commitByDate.has(commitDate)) {
          commitByDate.set(commitDate, commitByDate.get(commitDate) + 1);
        } else {
          commitByDate.set(commitDate, 1);
        }
      });

    });
  }

export default function Repositories({ repositories }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        overflow: "auto",
        maxHeight: "50vh",
      }}
    >
      {repositories?.map((repository: Repository) => {
        return (
          <>
            <ListItem key={repository.id}>
              <ListItemAvatar>
                <Avatar>
                  <GitHubIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={repository.name}
                secondary={`Main Language: ${repository.language}`}
                onClick={() => { getCommitHistory(repository.owner.login, repository.name); }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}
