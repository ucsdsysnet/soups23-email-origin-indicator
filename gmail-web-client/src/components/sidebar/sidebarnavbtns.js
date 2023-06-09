
import { Avatar } from "@material-ui/core";
import { Badge } from "@material-ui/core";
import { VideocamOff } from "@material-ui/icons";
import { Inbox, Send, Mail, Report, Videocam, Keyboard } from "@material-ui/icons";
import React, { useState } from "react";
import { useLocalContext } from '../../context/context'
import { useMailContext } from '../../context/mailcontext'

import { useNavigate, useParams } from "react-router-dom";
import { DBClicked } from "../util/utils";


// <SideButton name="Starred" />

const SidebarNavBtn = () => {  

  return (
      <div className="sidebar__btns">
        <SideButton name="Inbox" />
        <SideButton name="Sent" />
        <SideButton name="All Mail" />
        <SideButton name="Spam" />
      </div>
  );
};

export default SidebarNavBtn;

const vals = {
    "Inbox": <Inbox className="sidebar__icon"/>, 
    'Sent': <Send className="sidebar__icon"/>, 
    'All Mail': <Mail className="sidebar__icon"/>, 
    'Spam': <Report className="sidebar__icon"/> }

const SideButton = (props) => {
    const navigate = useNavigate();
    const {user_id, group_id} = useParams();

    const {drawerOpen, setactiveSideBarTab, activeSideBarTab, currentUser} = useLocalContext();
    const {primaryUnreadNumber, socialUnreadNumber, promoUnreadNumber} = useMailContext();

    return (
        <div className={`sidebar__btn sidebar__topBtn ${
            !drawerOpen && "sidebar__btnClose"
              } ${activeSideBarTab === props.name && "sidebar__active"}`}
              onClick={() => {setactiveSideBarTab(props.name);navigate(`/${group_id}/id/${user_id}/`);DBClicked({buttonName:"sideBar"+props.name,currentUser:currentUser})}}
              >
            <div
            className={`sidebar__btnLeft ${
                !drawerOpen && "sidebar__btnLeftClose"
            }`}
            >
                  {drawerOpen ? (
                      <>
                      {/* <Inbox className="sidebar__icon" /> */}
                      {vals[props.name]}
                        <p 
                        className={`${(props.name === 'Inbox' || activeSideBarTab === props.name) 
                        && "sidebar__btnLeft__bold__p"}`}
                        >
                        {props.name}
                        </p>
                      </>
                  ) : (
                      <Badge badgeContent={0} color="error">
                      <Inbox className="sidebar__icon" />
                      </Badge>
                  )}
             </div>
  
            <div className={`sidebar__unread ${!drawerOpen && `sidebar__unreadClose`}`}>
                {
                    (props.name === 'Inbox' || props.name === 'All Mail') ? (
                        primaryUnreadNumber+socialUnreadNumber+promoUnreadNumber > 0 ? (
                            <p>{primaryUnreadNumber+socialUnreadNumber+promoUnreadNumber}</p>
                        ) : (
                        <p></p>
                        )
                        
                    ) : (
                        <p></p>
                    )
                }
                
            </div>
          </div>

    )
}

export function MeetBtn(){
    const {drawerOpen} = useLocalContext();
    return (
        <div className="navabr__meetOptions">
            <p className="navbar__meetTitle">
                Meet
            </p>
            <div
            className={`sidebar__btn sidebar__topBtn ${!drawerOpen && "sidebar__btnLeftClose"}`}
            >
                <div className={`sidebar__btnLeft ${!drawerOpen && "sidebar__btnLeftClose"}`}>
                    {drawerOpen ? (
                        <>
                        <Videocam className="sidebar__icon">
                        </Videocam>
                        <p>New meeting</p>
                        </>
                    ) : (
                        <Videocam className="sidebar__icon">

                        </Videocam>
                    )}
                </div>
            </div>

            <div
            className={`sidebar__btn sidebar__topBtn ${!drawerOpen && "sidebar__btnLeftClose"}`}
            >
                <div className={`sidebar__btnLeft ${!drawerOpen && "sidebar__btnLeftClose"}`}>
                    {drawerOpen ? (
                        <>
                        <Keyboard className="sidebar__icon">
                        </Keyboard>
                        <p>Join a meeting</p>
                        </>
                    ) : (
                        <Keyboard className="sidebar__icon">

                        </Keyboard>
                    )}
                </div>
            </div>

        </div>
    )
}


export function HangoutBtn(){
    const {drawerOpen, currentUser} = useLocalContext();
    return (
       <div className="sidebar__hangoutsOptions">
           <div className="sidebar__hangoutsWrapper">
            <p className="navbar__meetTitle">
                Hangouts
            </p>
            <div className="sidebar__Hangoutsbadge">
                <Badge anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                    }
                }
                overlap="circular"
                color="error"
                variant="dot"
                >
                    <Avatar className="sidebar_avatarSmaller">
                    </Avatar>
                </Badge>
                <p>{currentUser.displayName}</p>

            </div>

           </div>
       </div>


    )
}
