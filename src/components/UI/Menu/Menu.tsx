import React, { useState } from 'react';
import styled from 'styled-components';

import { MapIcon } from '../Icons/MapIcon/MapIcon';
import { SettingsIcon } from '../Icons/SettingsIcon/SettingsIcon';
import { MenuItem } from '../MenuItem/MenuItem';
import { Submenu } from '../Submenu/Submenu';

const StyledMenu = styled.div`
	margin: 0;
	padding: 8px 0;
`;

const MenuItems = [
	{
		id: 'settings',
		icon: <SettingsIcon />,
		label: 'Ustawienia',
		slug: '',
		children: [
			{
				id: 'users',
				label: 'Użytkownicy',
				slug: '/users',
			},
			{
				id: 'roles',
				label: 'Grupy',
				slug: '/roles',
			},
		],
	},
	{
		id: 'map',
		icon: <MapIcon />,
		label: 'Mapa',
		slug: '/map',
		children: [],
	},
];

export function Menu() {
	const [openedItem, setOpenedItem] = useState('');
	return (
		<StyledMenu className="menu">
			{MenuItems.map((item) => (
				<div key={item.id}>
					<MenuItem
						id={item.id}
						icon={item.icon}
						isOpen={openedItem === item.id}
						setOpenedItem={setOpenedItem}
						label={item.label}
						url={item.children.length === 0 ? item.slug! : null}
					/>
					{item.children.length > 0 ? (
						<Submenu elements={item.children.length} isOpen={openedItem === item.id}>
							{item.children.map((subItem: any) => (
								<MenuItem
									key={subItem.id}
									id={subItem.id}
									label={subItem.label}
									url={subItem.slug}
								/>
							))}
						</Submenu>
					) : null}
				</div>
			))}
		</StyledMenu>
	);
}
