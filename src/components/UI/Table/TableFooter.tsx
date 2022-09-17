import React from 'react';
import styled from 'styled-components';

import { IconButton } from '../IconButton/IconButton';
import { ChevronLeftIcon } from '../Icons/ChevronLeftIcon/ChevronLeftIcon';
import { ChevronRightIcon } from '../Icons/ChevronRightIcon/ChevronRightIcon';
import { FirstPageIcon } from '../Icons/FirstPageIcon/FirstPageIcon';
import { LastPageIcon } from '../Icons/LastPageIcon/LastPageIcon';

const StyledFooter = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row-reverse;
	font-size: 12px;
	height: 56px;
	padding: 0 8px;
	user-select: none;
`;

const StyledPageNumber = styled.div`
	margin-right: 32px;
	width: auto;
`;

const StyledSelect = styled.select`
	border: 0;
	font-size: 12px;
	margin: 0 32px 0 8px;
	padding: 10px 5px;
	width: 64px;
`;

interface TableFooterProps {
	rowsNumber: number;
	pageNumber: number;
	setPageNumber: any;
	rowsPerPage: number;
	setRowsPerPage: any;
}

export function TableFooter({
	rowsNumber,
	pageNumber,
	setPageNumber,
	rowsPerPage,
	setRowsPerPage,
}: TableFooterProps) {
	return (
		<StyledFooter>
			<IconButton
				disabled={pageNumber >= Math.ceil(rowsNumber / rowsPerPage)}
				color="#777777"
				label="Ostatnia&nbsp;strona"
				onClick={() => {
					setPageNumber(Math.ceil(rowsNumber / rowsPerPage));
				}}
			>
				<LastPageIcon />
			</IconButton>
			<IconButton
				disabled={pageNumber >= Math.ceil(rowsNumber / rowsPerPage)}
				color="#777777"
				label="Następna"
				onClick={() => {
					if (pageNumber < Math.ceil(rowsNumber / rowsPerPage)) {
						setPageNumber(pageNumber + 1);
					}
				}}
			>
				<ChevronRightIcon />
			</IconButton>
			<IconButton
				disabled={pageNumber < 2}
				color="#777777"
				label="Poprzednia"
				onClick={() => {
					if (pageNumber > 1) {
						setPageNumber(pageNumber - 1);
					}
				}}
			>
				<ChevronLeftIcon />
			</IconButton>
			<IconButton
				disabled={pageNumber < 2}
				color="#777777"
				label="Pierwsza&nbsp;strona"
				onClick={() => {
					setPageNumber(1);
				}}
			>
				<FirstPageIcon />
			</IconButton>
			<StyledPageNumber>
				{1 + (pageNumber - 1) * rowsPerPage} -{' '}
				{(pageNumber - 1) * rowsPerPage + rowsPerPage < rowsNumber
					? (pageNumber - 1) * rowsPerPage + rowsPerPage
					: rowsNumber}{' '}
				z {rowsNumber}
			</StyledPageNumber>
			<StyledSelect
				onChange={(e) => {
					setRowsPerPage(parseInt(e.target.value, 10));
					setPageNumber(1);
				}}
			>
				<option value={0}>auto</option>
				<option value={5}>5</option>
				<option value={6}>6</option>
				<option value={7}>7</option>
				<option value={8}>8</option>
				<option value={9}>9</option>
				<option value={10}>10</option>
				<option value={15}>15</option>
				<option value={20}>20</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
				<option value={100}>100</option>
				<option value={200}>200</option>
				<option value={500}>500</option>
				<option value={1000}>1000</option>
			</StyledSelect>
			Wierszy na stronę:
		</StyledFooter>
	);
}
