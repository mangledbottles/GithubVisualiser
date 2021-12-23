import * as React from "react";

// Import Material UI components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
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

      // Create an array of objects with date and amount of commits
      // Fill in date gaps between commits
      // Output format: [{ date: "2020-01-01", commits: 1 }, { date: "2020-01-02", commits: 1 }]
      commitByDate.forEach((value, key) => {
        commitHistory.push({ date: key, commits: value });
      });
      commitHistory.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Fill in missing dates with 0 commits
      const firstCommitDate = commitHistory[0].date;
      const lastCommitDate = commitHistory[commitHistory.length - 1].date;
      const dateArray = [];
      const currentDate = new Date(firstCommitDate);
      while (currentDate <= new Date(lastCommitDate)) {
        dateArray.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      const commitHistoryDate = [];
      dateArray.forEach(date => {
        let commit = commitHistory.find(commit => commit.date === date);
        if (commit) {
          commitHistoryDate.push({ date, commits: commit.commits });
        } else {
          commitHistoryDate.push({ date, commits: 0 });
        }
      });

      console.log({ commitByDate, commitHistoryDate });
      // Set commits to the state
      setCommits(commitHistoryDate);
    });
  }

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
