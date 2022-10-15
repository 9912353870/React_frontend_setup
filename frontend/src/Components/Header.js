import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import { Logout } from "@mui/icons-material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar = ({ open, handleDrawerOpen, selectedTab = "" }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [details, setDetails] = React.useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    setDetails([...details, localStorage.getItem("fullname")]);
  }, []);
  return (
    // <Container maxWidth="xl" style={{ background: "#fff", color: "black" }}>
    <Toolbar disableGutters>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={() => handleDrawerOpen(!open)}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Typography
          sx={{
            padding: "0px 10px",
            fontSize: "18px",
            fontWeight: "600",
            color: "darkslategrey",
          }}
        >
          {selectedTab}
        </Typography>
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        {details.map((item) => (
          <Button
            key={item}
            sx={{
              padding: "0px 10px",
              fontSize: "15px",
              fontWeight: "600",
              color: "darkslategrey",
            }}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>

        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            badgeContent={17}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "yellow",
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Logout />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
    // </Container>
  );
};
export default ResponsiveAppBar;
