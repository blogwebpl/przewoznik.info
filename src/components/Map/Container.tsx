/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// import _ from 'lodash';
import L from 'leaflet';
import { Map } from './Map';
import { RootState } from '../../app/store';
import { setMapZoom, setMapCenter } from '../../features/uiSlice';

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
	// const [sliderMax, setSliderMax] = useState<number>(0);
	const [fromDateTime, setFromDateTime] = useState<string>('');
	const [toDateTime, setToDateTime] = useState<string>('');
	const { mapZoom, mapCenter } = useSelector((state: RootState) => state.ui);
	const { vehicles } = useSelector((state: RootState) => state.user);
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
			const { imei, show, follow, name, time: dateTime } = vehicle;
			const latLng = vehicle.gps.pos;
			const { spd: speed, ang: angle } = vehicle.gps;

			if (show) {
				map.showMarker({ imei, name, speed, angle, latLng, dateTime, follow });
			} else {
				map.hideMarker(imei);
			}
		});
	}, [vehicles, map]);

	// const test = async () => {
	// 	if (!map) return;
	// 	const fromDate = new Date(fromDateTime).toISOString();
	// 	const toDate = new Date(toDateTime).toISOString();

	// 	const route = await axios.get(
	// 		`http://localhost:3001/api/route?imei=352094082752483&fromDateTime=${fromDate}&toDateTime=${toDate}`
	// 	);

	// 	const data = route.data.route.map((point: any) => [point.gps.pos[1], point.gps.pos[0]]);
	// 	console.log(data);
	// 	map.setZoom(18);
	// 	map.addMarker({ lat: 53.14544, lon: 18.13467, speed: 20, angle: 0 });
	// 	map.addRoute(data);
	// 	setSliderMax(data.length);
	// };

	return (
		<>
			<StyledMap id="map" />
			<StyledControl>
				<StyledSlider
					type="range"
					min={0}
					max={0} // sliderMax
					value={sliderValue}
					onChange={(e) => {
						if (map) map.sliderValue = Number(e.target.value);
						setSliderValue(Number(e.target.value));
					}}
				/>
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
			</StyledControl>
		</>
	);
}
