import React from 'react';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Checkbox } from '../Checkbox/Checkbox';
import { IconButton } from '../IconButton/IconButton';
import { ArrowUpIcon } from '../Icons/ArrowUpIcon/ArrowUpIcon';
import { EditIcon } from '../Icons/EditIcon/EditIcon';

import Column from './ColumnInterface';

const StyledTable = styled.table`
	border: 0;
	border-collapse: collapse;
	margin: 0;
	padding: 0;
	table-layout: fixed;
`;
const StyledHead = styled.thead`
	border: 0;
	border-collapse: collapse;
	margin: 0;
	padding: 0;
	user-select: none;
	width: 100%;
`;
const StyledRow = styled.tr<{
	checked?: boolean;
}>`
	border-bottom: 1px solid #e0e0e0;
	border-collapse: collapse;
	display: flex;
	margin: 0;
	padding: 0;
	width: 100%;
	&:hover {
		background-color: rgba(0, 0, 0, 0.04);
	}
	${({ checked }) =>
		checked &&
		css`
			&,
			&:hover {
				background-color: ${(props) => props.theme.palette.secondary.row};
			}
		`}
`;
const StyledHeaderCell = styled.th<{ columnWidth: number }>`
	align-items: center;
	border: 0;
	border-collapse: collapse;
	box-sizing: border-box;
	display: flex;
	font-size: 14px;
	font-weight: bold;
	height: 55px;
	margin: 0 16px;
	padding: 0;
	text-align: left;
	width: ${(props) => `${props.columnWidth}px`};
	&:last-child {
		flex: 1;
		margin: 0 8px 0 16px;
	}
	&:first-child {
		margin: 0 0 0 3px;
	}
`;
const StyledCell = styled.td<{ columnWidth: number }>`
	align-items: center;
	border: 0;
	border-collapse: collapse;
	box-sizing: border-box;
	display: flex;
	font-size: 14px;
	font-weight: normal;
	height: 51px;
	margin: 0 16px;
	overflow: auto;
	padding: 0px 0px;
	text-align: left;
	width: ${(props) => `${props.columnWidth}px`};
	&:last-child {
		flex: 1;
		margin: 0 8px 0 16px;
	}
	&:first-child {
		margin: 0 0 0 3px;
	}
`;

const StyledTableBody = styled.tbody``;

const StyledHeight = styled.tr<{ dataRows: number }>`
	height: ${(props) => `${props.dataRows * 52}px`};
	background-color: red;
`;

const StyledArrow = styled.div<{ sort: string }>`
	transition: all 0.2s linear;

	${({ sort }: { sort: string }) =>
		sort === 'desc'
			? css`
					transform: scale(0.75) rotate(-180deg);
			  `
			: css`
					transform: scale(0.75) rotate(0);
			  `}
`;

interface TableBodyProps {
	tableColumns: Column[];
	setTableColumns: any;
	data: any;
	rowsPerPage: number;
	pageNumber: number;
	checkRow: ActionCreatorWithPayload<any, string>;
}

export function TableBody({
	tableColumns,
	setTableColumns,
	data,
	rowsPerPage,
	pageNumber,
	checkRow,
}: TableBodyProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<StyledTable>
			<StyledHead>
				<StyledRow>
					<StyledHeaderCell key="selectAll" columnWidth={50}>
						<Checkbox edge="" checked={false} setChecked={() => {}} />
					</StyledHeaderCell>
					{tableColumns.map((column: Column, index: any) => (
						<StyledHeaderCell
							key={column.key}
							columnWidth={column.width}
							onClick={() => {
								const c = [...tableColumns];
								if (c[index].sort === 'desc') c[index].sort = 'asc';
								else c[index].sort = 'desc';
								setTableColumns(c);
							}}
						>
							{column.label}&nbsp;
							<StyledArrow sort={column.sort}>
								<ArrowUpIcon />
							</StyledArrow>
						</StyledHeaderCell>
					))}
					<StyledHeaderCell key="edit" columnWidth={48}>
						&nbsp;
					</StyledHeaderCell>
				</StyledRow>
			</StyledHead>
			<StyledTableBody>
				{data
					.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)
					.map((row: any, index: any) => (
						<StyledRow key={`${row.id}${index}`} checked={row._checked}>
							<StyledCell columnWidth={50}>
								<Checkbox
									edge=""
									checked={row._checked}
									setChecked={() => {
										dispatch(checkRow({ id: row.id, check: !row._checked }));
									}}
								/>
							</StyledCell>
							{tableColumns.map((column: Column) => (
								<StyledCell
									key={column.key}
									columnWidth={column.width}
									onClick={() => {
										navigate(`edit/${row.id}`);
									}}
								>
									{row[column.key]}
								</StyledCell>
							))}
							<StyledCell key="edit" columnWidth={48}>
								<IconButton
									color="#777777"
									onClick={() => {
										navigate(`edit/${row.id}`);
									}}
								>
									<EditIcon />
								</IconButton>
							</StyledCell>
						</StyledRow>
					))}

				{(pageNumber - 1) * rowsPerPage + rowsPerPage - data.length > 0 &&
				(pageNumber - 1) * rowsPerPage + rowsPerPage - data.length <= rowsPerPage ? (
					<StyledHeight dataRows={(pageNumber - 1) * rowsPerPage + rowsPerPage - data.length} />
				) : null}
			</StyledTableBody>
		</StyledTable>
	);
}
