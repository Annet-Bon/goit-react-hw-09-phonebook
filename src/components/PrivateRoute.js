import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as selectors from '../redux/auth/auth-selectors';

export default function PrivateRoute({
    children,
    isAuthenticated,
    redirectTo,
    ...routeProps
}) {
    const isLoggedIn = useSelector(selectors.getIsAuthenticated);

    return (
        <Route {...routeProps}>
            {isLoggedIn ? children : <Redirect to={redirectTo} />}
        </Route>
    );
}