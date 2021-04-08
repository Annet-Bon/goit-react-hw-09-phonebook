import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import * as operations from '../redux/auth/auth-operations';

import styles from './RegisterPage.module.css';

export default function RegisterPage() {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegister = useCallback(
        (name, email, password) => dispatch(operations.register(name, email, password)),
        [dispatch],
    );

    const onChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
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

        onRegister({ name, email, password });
        reset();
    },[onRegister, name, email, password],);

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className={styles.wrapper} >
            <div className={styles.container}>
                <h1 className={styles.headTitle}>New User Registration</h1>

                <form
                    onSubmit={onSubmit}
                    className={styles.form}
                >
                    <label className={styles.label}>
                        <span className={styles.title}>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            className={styles.input}
                            onChange={onChange}
                            autoComplete="off"
                        />
                    </label>

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

                    <button className={styles.btn} type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}