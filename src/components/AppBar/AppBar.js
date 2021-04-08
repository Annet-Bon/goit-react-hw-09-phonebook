import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import UserMenu from './UserMenu';
import AuthNav from './AuthNav';

import * as selectors from '../../redux/auth/auth-selectors';

import styles from './AppBar.module.css';

export default function AppBar() {
    const isLoggedIn = useSelector(selectors.getIsAuthenticated);

    return (
        <header className={styles.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
}

AppBar.propTypes = {
    isLoggedIn: PropTypes.func,
};