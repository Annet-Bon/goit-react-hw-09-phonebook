import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as operations from '../redux/auth/auth-operations';

import styles from './RegisterPage.module.css';

export default function LoginPage() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = useCallback(
        (email, password) => dispatch(operations.logIn(email, password)),
        [dispatch],
    );

    const onChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }, []);

    const onSubmit = useCallback(event => {
        event.preventDefault();

        onLogin({ email, password });
        reset();
    },[onLogin, email, password],
    );

    const reset = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.headTitle}>Entrance to the personal account</h1>

                <form
                    onSubmit={onSubmit}
                    className={styles.form}
                >
                    <label className={styles.label}>
                        <span className={styles.title}>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className={styles.input}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </label>

                    <label className={styles.label}>
                        <span className={styles.title}>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className={styles.input}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </label>

                    <button className={styles.btn} type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}