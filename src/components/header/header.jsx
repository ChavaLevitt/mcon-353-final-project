import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import logo1 from "../../arrow.png";
import logo2 from "../../arrow2.png";

const pages = [
  { title: "Home", path: "/" },
  { title: "Bucket List", path: "/pinned" },
];

export const Header = () => {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(page.path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" style={{ background: "white", color:"black" }}>
        <Toolbar disableGutters>
         
          <Typography className="font-link"
            style={{textAlign: "right", marginRight:"20%"}}
            align="right"
            variant="h4"
            noWrap
            component="div"
            sx={{ mr: 2, display: {  width:"66%", float: "right"} }}
          >
           <img src={logo2} style={{width:"10%"}}/>
            <span className="font-link" style={{color:"#bd4c00"}}>
            ADVENTURE QUEST
              
            </span>
            <img src={logo1} style={{width:"10%"}}/>
          </Typography>
         

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              style = {{float: "right", marginRight: "0%"}}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  style={{float: "right"}}
                  key={page.title}
                  onClick={() => handleCloseNavMenu(page)}
                >
                  <Typography textAlign="right" color="black">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
           NATIONAL PARKS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
