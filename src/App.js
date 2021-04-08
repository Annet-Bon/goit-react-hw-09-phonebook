import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import AppBar from './components/AppBar/AppBar';
import { LoaderSpinner } from './components/Loader/Loader';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import * as operations from './redux/auth/auth-operations';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /*webpackChunkName: 'home-page' */),
);

const Register = lazy(() =>
  import(
    './views/RegisterPage.js' /*webpackChunkName: 'register' */
  ),
);

const Login = lazy(() =>
  import('./views/LoginPage.js' /*webpackChunkName: 'login' */),
);

const PhoneBook = lazy(() =>
  import(
    './views/PhoneBook.js' /*webpackChunkName: 'phonebook' */
  ),
);

export default function App() {
	const dispatch = useDispatch();

    useEffect(() => {
        dispatch(operations.getCurrentUser());
    }, [dispatch]);

	return (
		<div>
			<AppBar />
			<Suspense fallback={<LoaderSpinner />}>
				<Switch>
					<PublicRoute
						exact
						path="/"
						component={HomePage}
					/>
					<PublicRoute
						path="/register"
						restricted
						redirectTo="/contacts"
						component={Register}
					/>
					<PublicRoute
						path="/login"
						restricted
						redirectTo="/contacts"
						component={Login}
					/>
					<PrivateRoute
						path="/contacts"
						redirectTo="/login"
						component={PhoneBook}
					/>
				</Switch>
        	</Suspense>
		</div>
	);
}