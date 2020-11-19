import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';

import Trainings from './components/Trainings.js';
import Customers from './components/Customers.js';
import Calendar from './components/Calendar.js';
import Charts from './components/Charts.js';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

//menu
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function App() {
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <Router>
        <div className="AppBar">
            <AppBar position="static">
              <Toolbar>
                <IconButton 
                  edge="start" 
                  color="inherit" 
                  aria-label="menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" >
                  Personal trainer
                </Typography>
                <StyledMenu
                      id="customized-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClick={handleClose}
                    >
                    <nav>
 
                      <Link to = "/customers" style={{ textDecoration: 'none', color: 'black' }} >  
                        <StyledMenuItem>
                          <ListItemIcon>
                            <PeopleIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Customers" />
                        </StyledMenuItem>
                      </Link>

                      <Link to = "/trainings" style={{ textDecoration: 'none', color: 'black' }} >  

                        <StyledMenuItem>
                          <ListItemIcon>
                            <SportsHandballIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Trainings" />
                        </StyledMenuItem>
                        </Link>

                      <Link to = "/calendar" style={{ textDecoration: 'none', color: 'black' }} >  
                        <StyledMenuItem>
                          <ListItemIcon>
                            <CalendarTodayIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Calendar" />
                        </StyledMenuItem>
                      </Link>

                      <Link to = "/charts" style={{ textDecoration: 'none', color: 'black' }} >  
                        <StyledMenuItem>
                          <ListItemIcon>
                            <EqualizerIcon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary="Statistics" />
                        </StyledMenuItem>
                      </Link>
                    </nav>
                </StyledMenu>
              </Toolbar>
          </AppBar>
          <Switch>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/trainings">
                <Trainings />
              </Route>
              <Route path="/calendar">
                <Calendar />
              </Route>
              <Route path="/charts">
                <Charts />
              </Route>
              
            </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;