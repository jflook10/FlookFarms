import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TableChartIcon from "@material-ui/icons/TableChart";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function LeftNav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <div>
        <Link to={"/"}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to={"/gardenTable"}>
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Growing History" />
          </ListItem>
        </Link>
        <Link to={"/seasonNotes"}>
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText primary="Season Notes" />
          </ListItem>
        </Link>
      </div>
    </Drawer>
  );
}
