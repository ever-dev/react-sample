import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLoginUser } from 'app/pages/Auth/store/selectors';
import { getAuthCookie } from 'utils/cookies';
import { logout } from 'app/pages/Auth/store/actions';

import {
  makeStyles,
  createStyles,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Link,
} from '@material-ui/core';
import { lang } from 'locales/translations';

const useStyles = makeStyles(theme =>
  createStyles({
    accountWrapper: {
      flex: '0 0 48px',
    },
    navAvatar: {
      color: theme.palette.brand.main,
      backgroundColor: theme.palette.common.white,
      width: '36px',
      height: '36px',
      fontSize: '1rem',
    },
    navMenuItem: {
      color: theme.palette.primary.main,
      whiteSpace: 'unset',
      width: '200px',
      textDecoration: 'none',
      '&.Mui-disabled': {
        color: theme.palette.common.black,
        opacity: 1,
      },
    },
  }),
);

const NavigationBarAccount = React.memo(function NavigationBarAccount() {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(getLoginUser);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleCloseMenu();
    const authCookie = getAuthCookie();
    dispatch(logout(authCookie || ''));
  };

  return (
    <div className={classes.accountWrapper}>
      <IconButton
        aria-label={'account of current user'}
        aria-controls={'account_menu'}
        aria-haspopup={'true'}
        onClick={handleOpenMenu}
      >
        {user ? (
          <Avatar className={classes.navAvatar} alt={user.name}>
            {user.acronym}
          </Avatar>
        ) : null}
      </IconButton>
      <Menu
        id={'account_menu'}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleCloseMenu}
        style={{ marginTop: '38px' }}
      >
        <MenuItem className={classes.navMenuItem} disabled>
          {user ? user.name : ''}
        </MenuItem>
        {user && user.organization && user.organization.name ? (
          <MenuItem className={classes.navMenuItem} disabled>
            {user.organization.name}
          </MenuItem>
        ) : null}
        <Divider style={{ margin: '8px 0' }} />
        <Link
          variant={'body2'}
          style={{ textDecoration: 'none' }}
          component={RouterLink}
          to={'/settings'}
          onClick={handleCloseMenu}
        >
          <MenuItem className={classes.navMenuItem}>{t(lang.navbar.settings)}</MenuItem>
        </Link>
        <MenuItem className={classes.navMenuItem} onClick={handleLogOut}>
          {t(lang.navbar.log_out)}
        </MenuItem>
      </Menu>
    </div>
  );
});

export default NavigationBarAccount;
