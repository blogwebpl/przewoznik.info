import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Checkbox } from '../UI/Checkbox';

const StyledVehicle = styled.div`
	padding: 4px 14px;
	border-bottom: 1px solid gray;
	background-color: #fefefe;
	display: flex;
`;
const StyledCheckBoxContainer = styled.div`
	width: 40px;
`;

const StyledNameContainer = styled.div`
	width: 240px;
	padding-top: 4px;
	user-select: none;
`;

const StyledName = styled.span`
	font-size: 14px;
	font-weight: bold;
	height: 10px;
`;

const StyledDate = styled.span`
	font-size: 12px;
`;

export function Vehicle({ data }: { data: any }) {
	return (
		<StyledVehicle>
			<StyledCheckBoxContainer>
				<Checkbox label="" checked={data.show} setChecked={() => {}} />
			</StyledCheckBoxContainer>
			<StyledNameContainer>
				<StyledName>{data.name}</StyledName>
				<br />
				<StyledDate>{moment(data.time).format('YYYY-MM-DD HH:mm:ss')}</StyledDate>
			</StyledNameContainer>
		</StyledVehicle>
	);
}
