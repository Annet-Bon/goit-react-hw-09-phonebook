import { CSSTransition } from 'react-transition-group';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import * as operations from '../../redux/phonebook/phonebook-operations';
import * as selectors from '../../redux/phonebook/phonebook-selectors';

import Alert from '../Alert/Alert';

import alertStyles from '../Alert/fadeAlert.module.css';
import styles from './contactForm.module.css';

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectors.getAllContacts);

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [errorMessage, showErrorMessage] = useState(null);

    const addContact = useCallback(
        (name, number) => dispatch(operations.addContact(name, number)),
    [dispatch],);

    const addAlertMessage = useCallback(text => {
        showErrorMessage(text);
        setTimeout(() => showErrorMessage(null), 1500);
    }, []);

    const onChange = useCallback(event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        }
    }, []);

    const onSubmit = useCallback(event => {
        event.preventDefault();

        if (contacts.some(contact => contact.name === name)) {
            addAlertMessage(`${name} is already in contacts`);
            reset();
            return;
        }

        addContact(name, number);
        reset();
    },[contacts, name, number, addContact, addAlertMessage],);

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <>
            <CSSTransition
				in={!!errorMessage}
				classNames={alertStyles}
				timeout={250}
				unmountOnExit
			>
      			<Alert message={errorMessage}/>
    		</CSSTransition>
        <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>
                <span className={styles.title}>Name</span>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    value={name}
                    onChange={onChange}
                    required
                />
            </label>

            <label className={styles.label}>
                <span className={styles.title}>Number</span>
                <input
                    className={styles.input}
                    type="tel"
                    name="number"
                    pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?"
                    value={number}
                    onChange={onChange}
                    required
                />
            </label>

            <button type="submit" className={styles.btn}>Add new contact</button>
        </form>
        </>
    );
}

ContactForm.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
};