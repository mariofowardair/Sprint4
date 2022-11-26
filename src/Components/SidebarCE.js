import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { ImExit } from "react-icons/im";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarDataCE as SidebarData } from './SidebarDataCE';
import Submenu from './Submenu';


const Nav = styled.div`
    background: #003057;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #003057;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`

const SidebarWrap = styled.div`
    width: 100%
`

const closeTab = () => {
    window.open("about:blank", "_self");
    window.close();
};


const SidebarCE = () => {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)


  return (
   <>
   <IconContext.Provider value={{ color : '#fff'}}>
    <Nav>
        <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
        </NavIcon>
    </Nav>
    <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
        <NavIcon to="#">
            <AiIcons.AiOutlineClose onClick={showSidebar} />
        </NavIcon>
        {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
        })}
        <List>
            <ListItem key={'Quit'} button onClick = {() => closeTab()}>
                <ListItemIcon sx={{ m: "24px" }}>
                    <ImExit style={{ fill: '#f5f5f5' }}/>
                </ListItemIcon>
                <ListItemText primary={'Quit'} primaryTypographyProps={{color: "#f5f5f5", fontSize: '18px'}} sx={{ m: -6.23 }}/>
            </ListItem>
        </List>
        </SidebarWrap>
    </SidebarNav>
    </IconContext.Provider>
   </>

  );
};

export default SidebarCE;