import styles from '../Main/style.module.css';
import user from '../../assets/images/userDefault.png';
import React from 'react';
import { ListItemIcon, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const UserBlock = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={styles.userBlock}>
            <div className={styles.avatarContainer} aria-describedby={id} onClick={handleClick}>
                <img src={user} alt="user"/>
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
               <MenuList>
                   <MenuItem>
                       <ListItemIcon>
                           <SettingsIcon />
                       </ListItemIcon>
                       <Typography variant="body2" color="text.secondary">
                           Настройки
                       </Typography>
                   </MenuItem>

                   <MenuItem>
                       <ListItemIcon>
                           <PowerSettingsNewIcon />
                       </ListItemIcon>
                       <Typography variant="body2" color="text.secondary">
                           Выйти
                       </Typography>
                   </MenuItem>
               </MenuList>
            </Popover>
        </div>
    )
}

export default UserBlock;
