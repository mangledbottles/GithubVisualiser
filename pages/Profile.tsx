import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Import TS Interfaces
import { User } from "../utils/interfaces/User.interface";


export default function UserProfile({ username, user }: { username: string, user: User }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={user.avatar_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         @{username} - {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { user.bio }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Followers { user.followers }</Button>
        <Button size="small">Following { user.following }</Button>
      </CardActions>
    </Card>
  );
}
