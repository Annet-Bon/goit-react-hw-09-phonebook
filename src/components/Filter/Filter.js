import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../redux/phonebook/phonebook-actions';
import * as selectors from '../../redux/phonebook/phonebook-selectors';

import styles from './filter.module.css';

export default function Filter() {
    const dispatch = useDispatch();
    const value = useSelector(selectors.getFilter);

    const onChangeFilter = useCallback(event => dispatch(actions.changeFilter(event.target.value)), [
        dispatch,
    ]);

    return (
        <div className={styles.filter}>
            <p className={styles.title}>Find contacts by name</p>
            <input
                className={styles.filterInput}
                name="filter"
                onChange={onChangeFilter}
                value={value}
            />
        </div>
    );
};

Filter.propTypes = {
    value: PropTypes.string,
    onChangeFilter: PropTypes.func,
};