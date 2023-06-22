import React, {createContext, useContext, useState} from 'react';
import {formatDateYYYYMMDD} from './functions';

const initialData = {
	prices: [],
	isLoading: false,
	selectedMetal: 'gold',
	selectedMetalUnit: '€/g',
	selectedRange: 365, //in days
	after: formatDateYYYYMMDD(new Date().setDate(new Date().getDate() - 365)),
	before: formatDateYYYYMMDD(new Date()),
	previewData: [],
	trend: 0,
};

export const DataContext = createContext(initialData);

export const DataProvider = (props) => {
	const [data, setData] = useState(initialData);

	return <DataContext.Provider value={{data, setData}} {...props} />;
};
