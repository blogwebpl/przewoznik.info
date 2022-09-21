import React from 'react';
import { useSelector } from 'react-redux';
import { StyledSideMenu } from './styles';
import { RootState } from '../../app/store';
import { Vehicle } from './Vehicle';

export function SideMenu() {
	const { vehicles } = useSelector((state: RootState) => state.user);
	const { isSideMenuOpen } = useSelector((state: RootState) => state.ui);
	return (
		<StyledSideMenu isSideMenuOpen={isSideMenuOpen}>
			{vehicles && vehicles.map((vehicle: any) => <Vehicle key={vehicle.imei} data={vehicle} />)}
		</StyledSideMenu>
	);
}
