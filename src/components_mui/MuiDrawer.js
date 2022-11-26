import { Drawer, Box, Typography, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
  
//import {closeTab} from './closeTab'
const closeTab = () => {
    window.open("about:blank", "_self");
    window.close();
      };


export const MuiDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    return (
        <> 
            <IconButton size = 'large' onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon/>
            </IconButton>
            <Drawer anchor='left' open = {isDrawerOpen} onClose ={() => setIsDrawerOpen(false)} >
                <Box p={2} width='250px' textAlign='center' role='presentation'>
                    <Typography variant = 'h6' component = 'div'>
                    </Typography>
                    <br/>

                    <Button href="/map" variant="contained" style={{backgroundColor: "#B3A369"}}>
                        View Map
                    </Button> <br /> <br />

                    <Button href="/friends" variant="contained" style={{backgroundColor: "#B3A369"}}>
                        View Friends
                    </Button> <br/> <br />

                    <Button href="/" variant="contained" style={{backgroundColor: "#B3A369"}}>
                        Logout
                    </Button> <br/> <br />

                    <Button href="/ViewEvents" variant="contained" style={{backgroundColor: "#B3A369"}}>
                        View Events
                    </Button> <br/> <br />
                    
                    <Button variant = "contained" style={{backgroundColor: "#B3A369"}} onClick={closeTab}>Exit App</Button>


                </Box>
            </Drawer>
        </>
    )
}

