import { Component } from 'react';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import styles from './Loader.module.css';

export class LoaderSpinner extends Component {
	render() {
		return (
			<Loader
				className={styles.loader}
				type="Bars"
				color="#ab3c3c"
				height={200}
				width={200}
			/>
		);
	}
}