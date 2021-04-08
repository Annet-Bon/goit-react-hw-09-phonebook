import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import * as operations from '../../redux/phonebook/phonebook-operations';
import * as selectors from '../../redux/phonebook/phonebook-selectors';

import ContactListItem from '../ContactListItem/ContactListItem';

import styles from './contactList.module.css';

export default function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectors.getFilteredContacts);

    const onDeleteContact = useCallback(
        id => dispatch(operations.deleteContact(id)),
        [dispatch],
    );

    return(
        <TransitionGroup className={styles.list} component="ul">
            {contacts.map(contact => (
                <CSSTransition
                    key={contact.id}
                    timeout={250}
                    classNames={styles}
                >
                    <li className={styles.item}>
                        <ContactListItem contact={contact} onDeleteContact={onDeleteContact}/>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

ContactList.propTypes = {
	contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
};