import React from 'react';
import styled from 'styled-components';

import { IconButton } from '../IconButton/IconButton';
import { AddIcon } from '../Icons/AddIcon/AddIcon';
import { ExcelIcon } from '../Icons/ExcelIcon/ExcelIcon';
import { FilterIcon } from '../Icons/FilterIcon/FilterIcon';
import { PrintIcon } from '../Icons/PrintIcon/PrintIcon';
import { SortIcon } from '../Icons/SortIcon/SortIcon';
import { SearchField } from '../SearchField/SearchField';
import { Title } from '../Title/Title';

const StyledToolbar = styled.div`
	align-items: center;
	display: flex;
	height: 64px;
	padding: 0 8px 0 24px;
`;

const FlexGrow = styled.div`
	flex-grow: 1;
`;

const StyledIconContainer = styled.div`
	display: flex;
`;

interface TableCaptionProps {
	searchText: string;
	setSearchText: any;
	caption: string;
}

export function TableCaption({ searchText, setSearchText, caption }: TableCaptionProps) {
	return (
		<StyledToolbar>
			<Title caption={caption} />
			<FlexGrow />
			<SearchField id="search" value={searchText} setValue={setSearchText} type="text" />
			<StyledIconContainer>
				<IconButton color="#777777" onClick={() => {}} label="Filtruj">
					<FilterIcon />
				</IconButton>
				<IconButton color="#777777" onClick={() => {}} label="Priorytet&nbsp;sortowania">
					<SortIcon />
				</IconButton>
				<IconButton color="#777777" onClick={() => {}} label="Drukuj">
					<PrintIcon />
				</IconButton>
				<IconButton color="#777777" onClick={() => {}} label="Export&nbsp;XLS">
					<ExcelIcon />
				</IconButton>{' '}
				<IconButton color="#777777" onClick={() => {}} label="Dodaj">
					<AddIcon />
				</IconButton>
			</StyledIconContainer>
		</StyledToolbar>
	);
}
