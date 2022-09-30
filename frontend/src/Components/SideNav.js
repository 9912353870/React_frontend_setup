import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import StorageIcon from "@mui/icons-material/Storage";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { List, ListItem, Tooltip, Paper } from "@mui/material";
import logo from "../assets/logo.svg";

function SideNav({ handleDrawerClose }) {
  const [selected, setSelected] = React.useState("");
  const dynamicMenus = [
    {
      icon: <HomeIcon fontSize="large" />,
      title: "Home",
    },
    {
      icon: <StorageIcon fontSize="large" />,
      title: "Database",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      title: "User",
    },
    {
      icon: <SettingsIcon fontSize="large" />,
      title: "Settings",
    },
    {
      icon: <AutoGraphIcon fontSize="large" />,
      title: "Graph",
    },
  ];
  return (
    <>
      <nav aria-label="side navigation">
        <div onClick={() => false && handleDrawerClose()}>
          <img
            src={logo}
            width={50}
            height={60}
            style={{ margin: "10px 15px" }}
          />
        </div>
        <List>
          {dynamicMenus?.map((item) => {
            return (
              <Tooltip title={item?.title}>
                <ListItem
                  disablePadding
                  className={
                    selected === item?.title
                      ? "common-icon selected-item"
                      : "common-icon"
                  }
                  onClick={() => setSelected(item?.title)}
                >
                  <ListItemIcon className="side-nav-icon">
                    {item?.icon}
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </nav>
    </>
  );
}

export default SideNav;
