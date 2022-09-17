import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../app/store';
import { setIsSignin, setRole } from '../../features/userSlice';
import useAxios from '../../hooks/useAxios';
import { Card } from '../UI/Card';
import { IconList } from '../UI/IconList';
import { IconListItem } from '../UI/IconListItem';
import { LabeledSelect } from '../UI/LabeledSelect';
import { Title } from '../UI/Title';

export function Profile() {
	const dispatch = useDispatch();
	const { email, role, roles } = useSelector((state: RootState) => state.user);
	const options = roles.map((g: any) => ({
		value: g.roleId,
		label: g.roleName,
	}));

	const navigate = useNavigate();
	const axiosPost = useAxios('post');

	const signout = async () => {
		// await axiosPost({
		// 	url: '/user/signout',
		// });
		dispatch(setIsSignin(false));
		localStorage.removeItem('token');
		navigate('/signin');
	};

	return (
		<Card padding minWidth={420}>
			<Title caption={`Profil ${email}`} />
			<LabeledSelect
				margin
				id="group"
				label="Wybrana grupa"
				isRequired
				onChange={async (newValue: any) => {
					dispatch(
						setRole({
							roleId: newValue.value,
							roleName: newValue.label,
						})
					);
					await axiosPost({
						url: '/user/change-role',
						params: { roleId: newValue.value },
					});
				}}
				values={role ? { value: role.roleId, label: role.roleName } : null}
				options={options}
			/>

			<IconList>
				<IconListItem
					icon="Security"
					label="Zmień hasło"
					action={() => {
						navigate('/change-password');
					}}
				/>
				<IconListItem icon="Exit" label="Wyloguj się" action={signout} />
			</IconList>
		</Card>
	);
}
