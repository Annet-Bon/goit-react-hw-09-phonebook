import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as operations from '../../redux/auth/auth-operations';
import * as selectors from '../../redux/auth/auth-selectors';

import defaultAvatar from './default-avatar.png';
import styles from './AppBar.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    const name = useSelector(selectors.getUsername);

    const onLogOut = useCallback(() => {
        dispatch(operations.logOut());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <NavLink
                to="/contacts"
                exact
                className={styles.link}
                activeClassName={styles.activeLink}
            >
                Contacts
            </NavLink>
            <img src={defaultAvatar} alt="" width="32" />
            <span className={styles.name}>Welcome, {name}</span>
            <button
                type="button"
                onClick={onLogOut}
                className={styles.btn}
            >
                Logout
            </button>
        </div>
    );
}

UserMenu.propTypes = {
    name: PropTypes.string,
    onLogOut: PropTypes.func,
};