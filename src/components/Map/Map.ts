import L, { LatLng } from 'leaflet';
import { RotatedMarker } from 'leaflet-marker-rotation';
import _ from 'lodash';
import redCarMoveIcon from '../../assets/redCarMove.svg';
import redCarStopIcon from '../../assets/redCarStop.svg';

interface MarkerProps {
	vid: string;
	name: string;
	speed: number;
	angle: number;
	latLng: [number, number];
	dateTime: Date;
	follow: boolean;
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

interface ConstructorProps {
	mapId: string;
	latLng: [number, number];
	zoom: number;
}

export class Map {
	private map;
	private slider: number = 1;
	private routePolyline: L.Polyline = L.polyline([]);
	private routeData: L.LatLng[] = [];
	private markers: { vid: string; marker: RotatedMarker }[] = [];

	constructor({ mapId, latLng, zoom }: ConstructorProps) {
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

	showMarker({ vid, name, speed, angle, latLng, dateTime, follow }: MarkerProps): void {
		if (!this.map) return;
		const markerLabel = `<strong>${name}</strong><br />${speed} km/h<br />${new Date(
			dateTime
		).toLocaleString('pl', { dateStyle: 'short' })}`;
		const icon = speed > 0 ? redCarMove : redCarStop;
		const point = angle > 180 ? L.point(16, 0) : L.point(-16, 0);
		const direction = angle > 180 ? 'right' : 'left';
		const index = _.findIndex(this.markers, { vid });
		const markerExists = index > -1;
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
			marker.on('click', () => {
				/* tip on top */
				marker.closeTooltip();
				marker.openTooltip();
			});
			if (follow) {
				this.map.panTo(latLng);
			}
			return;
		}

		const markerOptions: RotatedMarkerOptions = {
			icon,
			rotationAngle: angle,
		};
		const marker = new RotatedMarker(latLng, markerOptions)
			.on('click', () => {
				/* tip on top */
				marker.closeTooltip();
				marker.openTooltip();
				if (this.map) {
					this.map.panTo(marker.getLatLng());
				}
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
		marker.addTo(this.map);
		console.log(`Dodaję marker: ${vid}`);
		this.markers.push({ vid, marker });
		console.log(`Mam w tablicy markerów: ${this.markers.length}`);
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

	addRoute(data: [L.LatLng]) {
		if (!this.map) return;
		this.routeData = data;
	}

	drawRoute(color: string = 'blue') {
		if (!this.map) return;
		if (this.routePolyline) {
			this.map?.removeLayer(this.routePolyline);
		}
		const currentRouteData = this.routeData.slice(0, this.sliderValue + 1);
		if (!currentRouteData.length) return;
		this.routePolyline = L.polyline(currentRouteData, {
			color,
			opacity: 0.9,
			weight: 5,
		}).addTo(this.map);
		// const lastPoint: [number, number] = currentRouteData.slice(-1)[0];
		// this.map.panTo(new L.LatLng(lastPoint[0], lastPoint[1]));
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
