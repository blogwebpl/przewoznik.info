import React from 'react';
import { IconButton } from '../UI/IconButton/IconButton';
import { EjectIcon } from '../UI/Icons/EjectIcon/EjectIcon';
import { ForwardIcon } from '../UI/Icons/ForwardIcon/ForwardIcon';
import { NextIcon } from '../UI/Icons/NextIcon/NextIcon';
import { PauseIcon } from '../UI/Icons/PauseIcon/PauseIcon';
import { PlayIcon } from '../UI/Icons/PlayIcon/PlayIcon';
import { PreviousIcon } from '../UI/Icons/PreviousIcon/PreviousIcon';
import { RewindIcon } from '../UI/Icons/RewindIcon/RewindIcon';
import { StyledButtonContainer, StyledControl, StyledSlider, StyledDate } from './control.style';

export function Control() {
	return (
		<StyledControl>
			<StyledDate>2022-01-25 21:00:00</StyledDate>
			<StyledSlider type="range" min={0} max={100} />
			<StyledButtonContainer>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<PreviousIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<RewindIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<PauseIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<PlayIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<ForwardIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<NextIcon />
				</IconButton>
				<IconButton darkBg color="#777" onClick={() => {}}>
					<EjectIcon />
				</IconButton>
			</StyledButtonContainer>
		</StyledControl>
	);
}

// export function Control() {
// 	return (
// 		<StyledControl>
// 			<StyledSlider
// 				type="range"
// 				min={0}
// 				max={sliderMax}
// 				value={sliderValue}
// 				onChange={(e) => {
// 					if (map) map.sliderValue = Number(e.target.value);
// 					setSliderValue(Number(e.target.value));
// 				}}
// 			/>
// 			{sliderValue} / {sliderMax}
// 			<button
// 				type="button"
// 				onClick={() => {
// 					if (sliderValue === 0) return;
// 					if (map) map.sliderValue = sliderValue - 1;
// 					setSliderValue(sliderValue - 1);
// 				}}
// 			>
// 				&lt;
// 			</button>
// 			<button
// 				type="button"
// 				onClick={() => {
// 					// if (sliderValue === sliderMax) return;
// 					if (map) map.sliderValue = sliderValue + 1;
// 					setSliderValue(sliderValue + 1);
// 				}}
// 			>
// 				&gt;
// 			</button>
// 			<input
// 				type="datetime-local"
// 				value={fromDateTime}
// 				onChange={(e) => {
// 					setFromDateTime(e.target.value);
// 				}}
// 			/>{' '}
// 			<input
// 				type="datetime-local"
// 				value={toDateTime}
// 				onChange={(e) => {
// 					setToDateTime(e.target.value);
// 				}}
// 			/>
// 			<select
// 				onChange={(e) => {
// 					setRouteVehicle(e.target.value);
// 				}}
// 			>
// 				{vehicles &&
// 					vehicles.map((vehicle) => (
// 						<option key={vehicle.vid} value={vehicle.vid}>
// 							{vehicle.name}
// 						</option>
// 					))}
// 			</select>
// 			<button type="button" onClick={loadRoute}>
// 				load
// 			</button>
// 		</StyledControl>
// 	);
// }
