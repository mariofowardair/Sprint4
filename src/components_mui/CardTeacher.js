import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import {Button, Container} from '@mui/material';

const cards = [
    {
      id: 1,
      title: "Events",
      buttonOne: "View",
      hrefOne: "/ViewEvents",
      image: "https://static.vecteezy.com/system/resources/previews/007/480/334/original/icon-create-event-suitable-for-user-interface-symbol-long-shadow-style-simple-design-editable-design-template-simple-symbol-illustration-vector.jpg"
    },
    {
      id: 2,
      title: "Map",
      buttonOne: "View",
      hrefOne: "/map",
      image: "https://cdn.dribbble.com/users/2837665/screenshots/14717475/2e05aa68-f9e7-4cda-b7e4-7f9f29a208e7_4x.png"
    },
    {
      id: 3,
      title: "Contact Host",
      buttonOne: "View",
      hrefOne: "/contact",
      image: "https://business.vcu.edu/media/business/images/events/stock/webinar-icon.png"
    },
    ]

export function CardTeacher() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
        {cards.map(card => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                component="img"
                sx={{
                    // 16:9
                    minHeight: 250,
                    minWidth: 263,
                    maxHeight: 250,
                    maxWidth: 263
                }}
                image={card.image}
                alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                    </Typography>
                </CardContent>
                <CardActions>
                <Button size="small" href={card.hrefOne}>{card.buttonOne}</Button>
                <Button size="small" href={card.hrefTwo}>{card.buttonTwo}</Button>
                </CardActions>
            </Card>
            
            </Grid>
        ))}
        </Grid>
    </Container>
  );
}