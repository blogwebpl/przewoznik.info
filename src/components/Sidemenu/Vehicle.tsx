import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Checkbox } from '../UI/Checkbox';
import { setVehicleShow } from '../../features/userSlice';
import { setMapCenter } from '../../features/uiSlice';

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
	const dispatch = useDispatch();
	const axiosPost = useAxios('post');
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<StyledVehicle>
			<StyledCheckBoxContainer>
				<Checkbox
					label=""
					checked={data.show}
					setChecked={() => {
						axiosPost({
							url: '/user/imei',
							params: { imei: data.imei, live: data.live, show: !data.show, info: data.info },
						});
						dispatch(setVehicleShow({ imei: data.imei, show: !data.show }));
					}}
				/>
			</StyledCheckBoxContainer>
			<StyledNameContainer
				onClick={() => {
					if (data.show) {
						if (location.pathname !== '/map') {
							navigate('/map');
						}
						dispatch(setMapCenter([data.gps.pos[0], data.gps.pos[1]]));
					}
				}}
			>
				<StyledName>{data.name}</StyledName>
				<br />
				<StyledDate>{moment(data.time).format('YYYY-MM-DD HH:mm:ss')}</StyledDate>
			</StyledNameContainer>
		</StyledVehicle>
	);
}
