import React, { useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import People from '../People';
import Planets from '../Planets';
import Starships from '../Starships';
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useStyles } from './styles';
import {
  ListItem,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
} from '@material-ui/core';

export default function HomePage() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(null);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderData = () => {
    switch (flag) {
      case 'people':
        return <People data={data} />;
      case 'planets':
        return <Planets data={data} />;
      case 'starships':
        return <Starships data={data} />;
      default:
        return <h1>Choice category</h1>;
    }
  };
  const getData = menuItem => {
    setFlag(menuItem);
    axios.get(`https://swapi.dev/api/${menuItem}/`).then(function (response) {
      const { data } = response;
      setData(data.results);
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Star Wars wiki
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              getData('people');
            }}
          >
            Persons
          </ListItem>
          <ListItem
            button
            onClick={() => {
              getData('planets');
            }}
          >
            Planets
          </ListItem>
          <ListItem
            button
            onClick={() => {
              getData('starships');
            }}
          >
            Starships
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div>{renderData()}</div>
      </main>
    </div>
  );
}
