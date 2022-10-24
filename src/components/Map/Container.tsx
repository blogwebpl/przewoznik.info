/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import { AxiosResponse } from 'axios';
import { Map, RoutePoint } from './Map';
import { RootState } from '../../app/store';
import { setMapZoom, setMapCenter } from '../../features/uiSlice';
import useAxios from '../../hooks/useAxios';

const StyledMap = styled.div`
	width: 100%;
	height: 100%;
	background: gray;
`;

const StyledControl = styled.div`
	background-color: white;
	position: absolute;
	width: 640px;
	bottom: 16px;
	height: 94px;
	z-index: 400;
	left: calc(50% - 320px);
	opacity: 0.9;
`;

const StyledSlider = styled.input`
	width: 480px;
	position: absolute;
	left: 80px;
	top: 16px;
`;

export function MapContainer() {
	const dispatch = useDispatch();
	const [map, setMap] = useState<Map | undefined>();
	const [sliderValue, setSliderValue] = useState<number>(1);
	const [sliderMax, setSliderMax] = useState<number>(0);
	const [fromDateTime, setFromDateTime] = useState<string>('');
	const [toDateTime, setToDateTime] = useState<string>('');
	const { mapZoom, mapCenter } = useSelector((state: RootState) => state.ui);
	const { vehicles } = useSelector((state: RootState) => state.user);
	const [routeVehicle, setRouteVehicle] = useState<string>(
		vehicles && vehicles.length > 0 ? vehicles[0].vid : ''
	);

	const axiosGet = useAxios('get');

	useEffect(() => {
		setRouteVehicle(vehicles[0]?.vid);
	}, [vehicles]);

	useEffect(() => {
		if (!map) {
			setMap(new Map({ mapId: 'map', latLng: mapCenter, zoom: mapZoom }));
		}

		return () => {
			if (map) {
				const zoom = map.getZoom();
				const latLng: L.LatLng = map.getCenter();
				dispatch(setMapZoom(zoom));
				dispatch(setMapCenter([latLng.lat, latLng.lng]));

				map.close();
				setMap(undefined);
			}
		};
	}, [map]);
	useEffect(() => {
		if (!map) return;
		map.setCenter(new L.LatLng(mapCenter[0], mapCenter[1]));
	}, [mapCenter]);

	useEffect(() => {
		if (!map) return;
		vehicles.forEach((vehicle) => {
			const { vid, show, follow, name, time: dateTime } = vehicle;
			if (show && vehicle.gps) {
				const latLng = vehicle.gps.pos;
				const { spd: speed, ang: angle } = vehicle.gps;
				map.showMarker({ vid, name, speed, angle, latLng, dateTime, follow });
			} else {
				map.hideMarker(vid);
			}
		});
	}, [vehicles, map]);

	const loadRoute = async () => {
		if (!map) return;

		const fromDate = new Date(fromDateTime).toISOString();
		const toDate = new Date(toDateTime).toISOString();

		const route: AxiosResponse<{ route: RoutePoint[] }> = await axiosGet({
			url: `route?vid=${routeVehicle}&fromDateTime=${fromDate}&toDateTime=${toDate}`,
		});

		if (!route?.data?.route?.length) {
			return;
		}
		map.setZoom(18);
		map.setRoute(route.data.route);
		setSliderMax(route.data.route.length);
	};

	return (
		<>
			<StyledMap id="map" />
			<StyledControl>
				<StyledSlider
					type="range"
					min={0}
					max={sliderMax}
					value={sliderValue}
					onChange={(e) => {
						if (map) map.sliderValue = Number(e.target.value);
						setSliderValue(Number(e.target.value));
					}}
				/>
				{sliderValue} / {sliderMax}
				<button
					type="button"
					onClick={() => {
						if (sliderValue === 0) return;
						if (map) map.sliderValue = sliderValue - 1;
						setSliderValue(sliderValue - 1);
					}}
				>
					&lt;
				</button>
				<button
					type="button"
					onClick={() => {
						// if (sliderValue === sliderMax) return;
						if (map) map.sliderValue = sliderValue + 1;
						setSliderValue(sliderValue + 1);
					}}
				>
					&gt;
				</button>
				<input
					type="datetime-local"
					value={fromDateTime}
					onChange={(e) => {
						setFromDateTime(e.target.value);
					}}
				/>{' '}
				<input
					type="datetime-local"
					value={toDateTime}
					onChange={(e) => {
						setToDateTime(e.target.value);
					}}
				/>
				<select
					onChange={(e) => {
						setRouteVehicle(e.target.value);
					}}
				>
					{vehicles &&
						vehicles.map((vehicle) => (
							<option key={vehicle.vid} value={vehicle.vid}>
								{vehicle.name}
							</option>
						))}
				</select>
				<button type="button" onClick={loadRoute}>
					load
				</button>
			</StyledControl>
		</>
	);
}
