/* eslint-disable prefer-destructuring */
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import useAxios from '../../hooks/useAxios';
import { Checkbox } from '../UI/Checkbox';
import { setVehicleInfo, setVehicleLive, setVehicleShow } from '../../features/userSlice';
import { setMapCenter } from '../../features/uiSlice';
import { InfoIcon } from '../UI/Icons/InfoIcon/InfoIcon';
import { IconButton } from '../UI/IconButton';
import { IcCenterIcon } from '../UI/Icons/IcCenterIcon/IcCenterIcon';
import { CarBatteryIcon } from '../UI/Icons/CarBatteryIcon/CarBatteryIcon';

const StyledVehicle = styled.div`
	border-bottom: 1px solid gray;
	background-color: #fefefe;
`;

const StyledBasicData = styled.div`
	padding: 4px 14px;
	width: 292px;
	height: 48px;
	display: flex;
`;

const StyledInfo = styled.div`
	padding: 4px 14px;
	width: 292px;
	height: 48px;
	display: flex;
`;

const StyledIoContainer = styled.div`
	flex-basis: 33.33%;
	font-size: 12px;
	height: 48px;
	align-items: center;
	display: flex;
`;

const StyledIoIconContainer = styled.div`
	padding-right: 8px;
`;

const StyledIoInfoContainer = styled.div`
	padding-right: 8px;
	user-select: none;
`;

const StyledCheckBoxContainer = styled.div`
	width: 40px;
`;

const StyledNameContainer = styled.div`
	width: 156px;
	padding-top: 4px;
	user-select: none;
`;

const StyledName = styled.span`
	font-size: 14px;
	font-weight: bold;
	height: 10px;
`;

const StyledIconContainer = styled.div`
	width: 48px;
`;

const StyledDate = styled.span`
	font-size: 12px;
`;

export function Vehicle({ data }: { data: any }) {
	const dispatch = useDispatch();
	const axiosPost = useAxios('post');
	const location = useLocation();
	const navigate = useNavigate();
	const carBatteryIndex = _.findIndex(data.io, (io: [number, number]) => {
		return io[0] === 66;
	});
	let carBattery: string | number = '--';
	if (carBatteryIndex > -1) {
		carBattery = Math.round(data.io[carBatteryIndex][1] / 10) / 100;
	}
	return (
		<StyledVehicle>
			<StyledBasicData>
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
				<StyledIconContainer>
					<IconButton
						darkBg
						color={data.live ? '#ff4081' : '#777'}
						onClick={() => {
							axiosPost({
								url: '/user/imei',
								params: { imei: data.imei, live: !data.live, show: data.show, info: data.info },
							});
							dispatch(setVehicleLive({ imei: data.imei, live: !data.live }));
						}}
					>
						<IcCenterIcon />
					</IconButton>
				</StyledIconContainer>
				<StyledIconContainer>
					<IconButton
						darkBg
						color={data.info ? '#ff4081' : '#777'}
						onClick={() => {
							axiosPost({
								url: '/user/imei',
								params: { imei: data.imei, live: data.live, show: data.show, info: !data.info },
							});
							dispatch(setVehicleInfo({ imei: data.imei, info: !data.info }));
						}}
					>
						<InfoIcon />
					</IconButton>
				</StyledIconContainer>
			</StyledBasicData>
			{data.info && (
				<StyledInfo>
					<StyledIoContainer>
						<StyledIoIconContainer>
							<CarBatteryIcon />
						</StyledIoIconContainer>
						<StyledIoInfoContainer>{carBattery} V</StyledIoInfoContainer>
					</StyledIoContainer>
					<StyledIoContainer>
						<StyledIoIconContainer>
							<CarBatteryIcon />
						</StyledIoIconContainer>
						<StyledIoInfoContainer>{carBattery} V</StyledIoInfoContainer>
					</StyledIoContainer>
					<StyledIoContainer>
						<StyledIoIconContainer>
							<CarBatteryIcon />
						</StyledIoIconContainer>
						<StyledIoInfoContainer>{carBattery} V</StyledIoInfoContainer>
					</StyledIoContainer>
				</StyledInfo>
			)}
		</StyledVehicle>
	);
}
