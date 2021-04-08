import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as selectors from '../redux/auth/auth-selectors';

export default function PublicRoute({
    children,
    isAuthenticated,
    redirectTo,
    ...routeProps
}) {
    const isLoggedIn = useSelector(selectors.getIsAuthenticated);

    return (
        <Route {...routeProps}>
            {isLoggedIn && routeProps.restricted ? (
                <Redirect to={redirectTo} />
            ) : (children)}
        </Route>
    )
}