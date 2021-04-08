import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import ContactForm from '../components/ContactForm/ContactForm';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList';

import * as selectors from '../redux/phonebook/phonebook-selectors';
import * as operations from '../redux/phonebook/phonebook-operations';

import styles from './PhoneBook.module.css';
import filterStyles from '../components/Filter/fadeFilter.module.css';

export default function PhoneBook() {
	const dispatch = useDispatch();
	const contacts = useSelector(selectors.getAllContacts);

	useEffect(() => {
        dispatch(operations.fetchContacts());
    }, [dispatch]);

    return (
		<div className={styles.contain}>
			<div>
			<CSSTransition
				in={true}
				appear
				timeout={500}
				classNames={styles}
			>
				<h1 className={styles.title}>Phonebook</h1>
			</CSSTransition>

			<ContactForm />
			</div>
			{contacts.length === 0
				? <p className={styles.nothing}>There are no contacts :((</p>
				: (
				<div>
					<h2 className={styles.title}>Contacts</h2>
					<CSSTransition
						in={contacts.length > 1}
						timeout={500}
						classNames={filterStyles}
						unmountOnExit
					>
						<Filter />
					</CSSTransition>

					<ContactList />
				</div>
            )}
		</div>
	);
}