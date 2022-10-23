import dayjs from 'dayjs';
import L, { LatLng } from 'leaflet';
import { RotatedMarker } from 'leaflet-marker-rotation';
import _ from 'lodash';
import redCarMoveIcon from '../../assets/redCarMove.svg';
import redCarStopIcon from '../../assets/redCarStop.svg';
import blueCarMoveIcon from '../../assets/blueCarMove.svg';
import bleCarStopIcon from '../../assets/blueCarStop.svg';

interface MarkerProps {
	vid: string; // unique id
	name: string;
	speed: number;
	angle: number;
	latLng: [number, number];
	dateTime: Date;
	follow: boolean;
}

interface HistoryMarkerProps {
	name: string;
	speed: number;
	angle: number;
	latLng: [number, number];
	dateTime: Date;
	follow: boolean;
}

export interface RoutePoint {
	gps: {
		pos: [number, number];
		alt: number;
		ang: number;
		sat: number;
		spd: number;
	};
	time: Date;
	io: [number, number][];
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

const blueCarStop = L.icon({
	iconUrl: bleCarStopIcon,
	iconSize: [32, 37],
	iconAnchor: [16, 18],
});

const blueCarMove = L.icon({
	iconUrl: blueCarMoveIcon,
	iconSize: [32, 37],
	iconAnchor: [16, 18],
});

interface MapConstructorProps {
	mapId: string;
	latLng: [number, number];
	zoom: number;
}

export class Map {
	private map: L.Map | undefined;
	private slider: number = 1;
	private routePolyline: L.Polyline = L.polyline([]);
	private routeData: RoutePoint[] = [];
	private markers: { vid: string; marker: RotatedMarker }[] = [];
	private historyMarker: RotatedMarker | undefined;

	constructor({ mapId, latLng, zoom }: MapConstructorProps) {
		try {
			this.map = L.map(mapId).setView(latLng, zoom);
			this.map.removeControl(this.map.zoomControl);
			this.map.attributionControl.setPrefix(
				'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps"> Leaflet</a>'
			);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				detectRetina: true,
				minZoom: 4,
			}).addTo(this.map);
		} catch (err) {
			console.log(err);
		}
	}

	private static generateLabel(name: string, speed: number, dateTime: Date): string {
		return `<strong>${name}</strong><br />${speed} km/h<br />${dayjs(dateTime).format(
			'YYYY-MM-DD HH:mm:ss'
		)}`;
	}

	private static generateMarker(
		_latLng: [number, number],
		markerOptions: RotatedMarkerOptions,
		markerLabel: string,
		point: L.Point,
		direction: 'left' | 'right'
	): RotatedMarker {
		return new RotatedMarker(_latLng, markerOptions)
			.on('click', function markerOnCLick(this: RotatedMarker) {
				/* tip on top */
				console.log(this);
				this.closeTooltip();
				this.openTooltip();
				this._map.panTo(this.getLatLng());
			})
			.unbindTooltip()
			.bindTooltip(markerLabel, {
				offset: point,
				direction,
				opacity: 0.9,
				permanent: true,
				className: 'marker-label-red',
			})
			.openTooltip();
	}

	showMarker({ vid, name, speed, angle, latLng, dateTime, follow }: MarkerProps): void {
		if (!this.map) return;
		const markerLabel = Map.generateLabel(name, speed, dateTime);
		const icon = speed > 0 ? redCarMove : redCarStop;
		const point = angle > 180 ? L.point(16, 0) : L.point(-16, 0);
		const direction = angle > 180 ? 'right' : 'left';
		const index = _.findIndex(this.markers, { vid });
		const markerExists = index > -1;

		// update marker
		if (markerExists) {
			const { marker } = this.markers[index];
			marker.setIcon(icon);
			marker.setRotationAngle(angle);
			marker.setLatLng(latLng);
			marker.unbindTooltip();
			marker
				.bindTooltip(markerLabel, {
					offset: point,
					direction,
					opacity: 0.9,
					permanent: true,
					className: 'marker-label-red',
				})
				.openTooltip();
			marker.on('click', function markerOnClick(this: RotatedMarker) {
				/* tip on top */
				this.closeTooltip();
				this.openTooltip();
			});
			if (follow) {
				this.map.panTo(latLng);
			}
			return;
		}

		// add new marker
		const markerOptions: RotatedMarkerOptions = {
			icon,
			rotationAngle: angle,
		};
		const marker = Map.generateMarker(latLng, markerOptions, markerLabel, point, direction);
		marker.addTo(this.map);
		console.log(`Dodaję marker: ${vid}`);
		this.markers.push({ vid, marker });
		console.log(`Mam w tablicy markerów: ${this.markers.length}`);
	}

	showHistoryMarker({ name, speed, angle, latLng, dateTime, follow }: HistoryMarkerProps): void {
		if (!this.map) return;
		const markerLabel = Map.generateLabel(name, speed, dateTime);
		const icon = speed > 0 ? blueCarMove : blueCarStop;
		const point = angle > 180 ? L.point(16, 0) : L.point(-16, 0);
		const direction = angle > 180 ? 'right' : 'left';

		// update marker
		if (this.historyMarker) {
			this.historyMarker.setIcon(icon);
			this.historyMarker.setRotationAngle(angle);
			this.historyMarker.setLatLng(latLng);
			this.historyMarker.unbindTooltip();
			this.historyMarker
				.bindTooltip(markerLabel, {
					offset: point,
					direction,
					opacity: 0.9,
					permanent: true,
					className: 'marker-label-blue',
				})
				.openTooltip();
			this.historyMarker.on('click', function markerOnClick(this: RotatedMarker) {
				/* tip on top */
				this.closeTooltip();
				this.openTooltip();
			});
			if (follow) {
				this.map.panTo(latLng);
			}
			return;
		}

		// add new marker
		const markerOptions: RotatedMarkerOptions = {
			icon,
			rotationAngle: angle,
		};
		this.historyMarker = Map.generateMarker(latLng, markerOptions, markerLabel, point, direction);
		this.historyMarker.addTo(this.map);
		console.log(`Dodaję marker historii`);
	}

	hideMarker(vid: string) {
		if (!this.map) return;
		const index = _.findIndex(this.markers, { vid });
		if (index > -1) {
			console.log(`Usuwam marker: ${vid}`);
			const { marker } = this.markers[index];
			this.map.removeLayer(marker);
			this.markers.splice(index, 1);
			console.log(`Mam w tablicy markerów: ${this.markers.length}`);
		}
	}

	hideHistoryMarker() {
		if (!this.map) return;
		if (this.historyMarker) {
			console.log(`Usuwam marker historii`);
			this.map.removeLayer(this.historyMarker);
			this.historyMarker = undefined;
		}
	}

	setRoute(routeData: RoutePoint[]) {
		if (!this.map) return;
		this.routeData = routeData;
		const latLng: [number, number] = this.routeData[0].gps.pos;
		const dateTime = this.routeData[0].time;
		const speed = this.routeData[0].gps.spd;
		const angle = this.routeData[0].gps.ang;
		this.showHistoryMarker({
			name: 'history',
			latLng,
			speed,
			angle,
			dateTime,
			follow: true,
		});
		this.slider = 1;
		this.drawRoute();
	}

	drawRoute(color: string = 'blue') {
		if (!this.map) return;
		if (this.routePolyline) {
			this.map?.removeLayer(this.routePolyline);
		}

		const currentRouteData = this.routeData.slice(0, this.slider + 1);

		const gpsData: LatLng[] = currentRouteData.map(
			(point) => new LatLng(point.gps.pos[1], point.gps.pos[0])
		);

		if (!currentRouteData.length) return;
		this.routePolyline = L.polyline(gpsData, {
			color,
			opacity: 0.9,
			weight: 5,
		}).addTo(this.map);

		const point = this.slider;
		const latLng: [number, number] = [
			this.routeData[point].gps.pos[1],
			this.routeData[point].gps.pos[0],
		];
		const dateTime = this.routeData[point].time;
		const speed = this.routeData[point].gps.spd;
		const angle = this.routeData[point].gps.ang;
		this.showHistoryMarker({
			name: 'history',
			latLng,
			speed,
			angle,
			dateTime,
			follow: true,
		});

		const lastPoint = gpsData.slice(-1)[0];
		this.map.panTo(lastPoint);
	}

	setZoom(zoom: number) {
		if (!this.map) return;
		this.map.setZoom(zoom);
	}

	setCenter(latLng: L.LatLng): void {
		if (this.map) {
			this.map.panTo(latLng, { animate: true });
		}
	}

	getZoom(): number {
		if (!this.map) return 1;
		return this.map.getZoom();
	}

	getCenter(): L.LatLng {
		if (!this.map) return new LatLng(0, 0);
		return this.map.getCenter();
	}

	close() {
		if (!this.map) return;
		this.map.off();
		this.map.remove();
	}

	set sliderValue(value: number) {
		this.slider = value;
		this.drawRoute();
	}
}
