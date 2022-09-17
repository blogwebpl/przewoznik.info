import L from 'leaflet';
import { RotatedMarker } from 'leaflet-marker-rotation';
import redCarMoveIcon from '../../assets/redCarMove.svg';
import redCarStopIcon from '../../assets/redCarStop.svg';

interface MarkerProps {
	lat: number;
	lon: number;
	speed: number;
	angle: number;
}

interface RotatedMarkerOptions extends L.MarkerOptions {
	rotationAngle?: number;
	rotationOrigin?: string;
}

const redCarStop = L.icon({
	iconUrl: redCarStopIcon,
	iconSize: [32, 37],
	iconAnchor: [16, 18],
});

const redCarMove = L.icon({
	iconUrl: redCarMoveIcon,
	iconSize: [32, 37],
	iconAnchor: [16, 18],
});

export class Map {
	private _map;

	private _sliderValue: number = 1;

	private _routePolyline: any;

	private _routeData: [[number, number]] | [] = [];

	constructor(mapId: string) {
		try {
			this._map = L.map(mapId).setView([53.14544, 18.13467], 15);
			this._map.removeControl(this._map.zoomControl);
			this._map.attributionControl.setPrefix(
				'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"> Leaflet</a>'
			);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				detectRetina: true,
				minZoom: 4,
			}).addTo(this._map);
		} catch (err) {
			console.log(err);
		}
	}

	addMarker({ lat, lon, speed, angle }: MarkerProps) {
		if (!this._map) return;
		const markerOptions: RotatedMarkerOptions = {
			icon: speed > 0 ? redCarMove : redCarStop,
			rotationAngle: angle,
		};
		new RotatedMarker([lat, lon], markerOptions).addTo(this._map);
	}

	addRoute(data: [[number, number]]) {
		if (!this._map) return;
		this._routeData = data;
	}

	drawRoute(color: string = 'blue') {
		if (!this._map) return;
		if (this._routePolyline) {
			this._map?.removeLayer(this._routePolyline);
		}
		console.log(this._sliderValue + 1);
		const currentRouteData = this._routeData.slice(0, this._sliderValue + 1);
		if (!currentRouteData.length) return;
		this._routePolyline = L.polyline(currentRouteData, {
			color,
			opacity: 0.9,
			weight: 5,
		}).addTo(this._map);
		const lastPoint: [number, number] = currentRouteData.slice(-1)[0];
		console.log(this.sliderValue);
		console.log(this._routeData[this._sliderValue]);
		this._map.panTo(new L.LatLng(lastPoint[0], lastPoint[1]));
	}

	setZoom(zoom: number) {
		if (!this._map) return;
		this._map.setZoom(zoom);
	}

	close() {
		if (!this._map) return;
		this._map.off();
		this._map.remove();
	}

	set sliderValue(value: number) {
		this._sliderValue = value;
		this.drawRoute();
	}
}
