import React, { useEffect, useState } from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import dataFilter from '../../../functions/dataFilter';
import dataSort from '../../../functions/dataSort';
import throttle from '../../../functions/throttle';

import Column from './ColumnInterface';
import { TableBody } from './TableBody';
import { TableCaption } from './TableCaption';
import { TableFooter } from './TableFooter';

interface TableProps {
	columns: Column[];
	data: any;
	caption: string;
	checkRow: ActionCreatorWithPayload<any, string>;
}

export function Table({ columns, data, caption, checkRow }: TableProps) {
	const [pageNumber, setPageNumber] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchText, setSearchText] = useState('');
	const [tableColumns, setTableColumns] = useState<Column[]>(columns);
	const [tableData, setTableData] = useState<any>(
		dataSort(dataFilter(data, searchText), tableColumns)
	);

	useEffect(() => {
		throttle(setTableData(dataSort(dataFilter(data, searchText), tableColumns)), 500);
	}, [data, searchText, tableColumns]);

	return (
		<>
			<TableCaption
				caption={caption}
				searchText={searchText}
				setSearchText={(text: string) => {
					setSearchText(text);
					setPageNumber(1);
				}}
			/>
			<TableBody
				tableColumns={tableColumns}
				setTableColumns={setTableColumns}
				data={tableData}
				pageNumber={pageNumber}
				rowsPerPage={rowsPerPage}
				checkRow={checkRow}
			/>
			<TableFooter
				rowsNumber={tableData ? tableData.length : 0}
				pageNumber={pageNumber}
				setPageNumber={setPageNumber}
				rowsPerPage={rowsPerPage}
				setRowsPerPage={setRowsPerPage}
			/>
		</>
	);
}
