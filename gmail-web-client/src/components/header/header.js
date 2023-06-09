import React from 'react'
import { Apps, Menu, Search, Settings, HelpOutline } from '@material-ui/icons'
import './styles.css'
import { Avatar } from '@material-ui/core'
import { Popover, makeStyles } from '@material-ui/core'
import { Badge } from '@material-ui/core'
import { Camera } from '@material-ui/icons'
import { CameraOutlined } from '@material-ui/icons'
import { CameraAltOutlined } from '@material-ui/icons'
import { PersonAddOutlined } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { auth } from "../../lib/firebase"
import { useLocalContext } from '../../context/context'
import { useNavigate,useParams } from "react-router-dom";
import { DBClicked,DBEvent } from "../util/utils";
import { useEffect } from "react";


// JS Styling
const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));


const Header = () => {
    // 
    const classes = useStyles();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    var currentFocus = null;

    var open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const {currentUser, setCurrentUser, setAutoLogin, setdrawerOpen, drawerOpen, setAppState} = useLocalContext();

    const navigate = useNavigate();
    const {user_id, group_id} = useParams();
    
    const signout = () => {
        DBClicked({currentUser:currentUser, buttonName:"signOut"});

        auth.signOut();
        setCurrentUser(null);
        //setAutoLogin(false);
        setAppState('signin');
        navigate(`/${group_id}/id/${user_id}/`);
    }
    
    const handleAvatarClick = (event) => {
        // console.log(currentUser)
        setAnchorEl(event.currentTarget);
        };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // User has switched back to the tab
const onFocus = () => {
    //console.log("onFocus",Date.now())
    // if (currentFocus !== true){
    //     currentFocus = true;
    //     console.log(true);
    // }
    DBEvent({eventName:"TabFocused", currentUser: currentUser, desired_ts: Date.now()})
  };
  
  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    //console.log("onBlur",Date.now())
    // if (currentFocus !== false){
    //     currentFocus = false;
    //     console.log(false);
    // }
    DBEvent({eventName:"TabBlurred", currentUser: currentUser, desired_ts: Date.now()})
  };
  
  const WindowFocusHandler = () => {
    useEffect(() => {
        window.addEventListener("focus", onFocus);
        window.addEventListener("blur", onBlur);
        // Calls onFocus when the window first loads
        onFocus();
        // Specify how to clean up after this effect:
        return () => {
            window.removeEventListener("focus", onFocus);
            window.removeEventListener("blur", onBlur);
        };
  }, []);
  
    return <></>;
  };

  const windowHandler = WindowFocusHandler();

  
    return (
        <div className='home__header'>
            <div className='home__left'>
                <Menu
                className="home__menuIcon"
                onClick={() => {setdrawerOpen(!drawerOpen); DBClicked({currentUser:currentUser, buttonName:"homeDrawer"});}}
                />
                <img className="home__logo" 
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png" alt="Gmail" 
                onClick={() => {navigate(`/${group_id}/id/${user_id}/`); ; DBClicked({currentUser:currentUser, buttonName:"homeLogo"});}}
                />
            </div>

            <div className='home__center'>
                <Search />
                <input className='home__input' placeholder="Search Mail"></input>
            </div>

            <div className='home__right'>
                <HelpOutline>                    
                </HelpOutline>
                <Settings />
                <Apps />
                <div>
                    <Avatar
                    onClick={handleAvatarClick}
                    ></Avatar>
                    <Popover className='home__popover' 
                    onClose={handleClose}
                    open={open}
                    id={id}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical:"bottom",
                        horizontal:"center"
                    }}
                    transformOrigin={{
                        vertical:"top"
                    }}
                    >
                    
                        <div className='home__popoverContainer'>
                            <div className='home__popover__top'>
                                <Badge overlap="circular"
                                anchorOrigin={{
                                    vertical:"bottom",
                                    horizontal:"right"
                                }}
                                badgeContent={
                                    <div className='home__badge'>
                                        <CameraAltOutlined className='home__camera'>
                                        </CameraAltOutlined>
                                    </div>
                                }
                                >
                                <Avatar className={classes.large}></Avatar>
                                </Badge>

                                <div className='home__text'>
                                    <div className="home__displayName">
                                        {currentUser.displayName}
                                    </div>
                                    <div className="home__mail">
                                        {/* {currentUser.email} */}
                                        participant@gmail.com
                                    </div>
                                                    
                                    <div className='home__btn'>
                                        Manage Your Google Account
                                    </div>
                                </div>     
                            </div>

                            <div className='home__popover__btm'>
                                    <div className='home__addBtn'>
                                        <PersonAddOutlined className='home__addIcon'>

                                        </PersonAddOutlined>
                                        <p>Add Another Account</p>
                                    </div>
                                    
                                    <Button variant="outlined"
                                     className='home__signOut'
                                     onClick={signout}>
                                        Sign Out
                                    </Button>
                            </div>

                            <div className='home__popover__footer'>
                                <p>Privacy Policy</p>
                                <span>•</span>
                                <p>Terms of service</p>
                            </div>

                        </div>
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Header