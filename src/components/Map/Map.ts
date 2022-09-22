import L, { LatLng } from 'leaflet';
import { RotatedMarker } from 'leaflet-marker-rotation';
import _ from 'lodash';
import redCarMoveIcon from '../../assets/redCarMove.svg';
import redCarStopIcon from '../../assets/redCarStop.svg';

interface MarkerProps {
	imei: string;
	lat: number;
	lng: number;
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

	private _markers: any[] = [];

	constructor({ mapId, lat, lng }: { mapId: string; lat: number; lng: number }) {
		try {
			this._map = L.map(mapId).setView([lat, lng], 15);
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

	addMarker({ imei, lat, lng, speed, angle }: MarkerProps) {
		if (!this._map) return;
		const index = _.findIndex(this._markers, { imei });
		if (index === -1) {
			const markerOptions: RotatedMarkerOptions = {
				icon: speed > 0 ? redCarMove : redCarStop,
				rotationAngle: angle,
			};
			const marker = new RotatedMarker([lat, lng], markerOptions);
			marker.addTo(this._map);
			console.log(`Dodaję marker: ${imei}`);
			this._markers.push({ imei, marker });
			console.log(`Mam w tablicy markerów: ${this._markers.length}`);
		}
	}

	removeMarker(imei: string) {
		if (!this._map) return;
		const index = _.findIndex(this._markers, { imei });
		if (index > -1) {
			console.log(`Usuwam marker: ${imei}`);
			const { marker } = this._markers[index];
			this._map.removeLayer(marker);
			this._markers.splice(index, 1);
			console.log(`Mam w tablicy markerów: ${this._markers.length}`);
		}
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

	getZoom(): number {
		if (!this._map) return 1;
		return this._map.getZoom();
	}

	getLatLng(): L.LatLng {
		if (!this._map) return new LatLng(0, 0);
		return this._map.getCenter();
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
