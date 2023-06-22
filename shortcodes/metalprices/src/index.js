import React from 'react';
import {render} from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import Selection from './components/selection';
import Range from './components/range';
import ChartWrapper from './components/chartWrapper';
import {DataProvider} from './DataProvider';

const Main = () => {
	return (
		<DataProvider>
			<Selection />
			<Range />
			<ChartWrapper />
		</DataProvider>
	);
};

domReady(() => {
	render(<Main />, document.getElementById('react-metalprices'));
});
