/* eslint-disable react/no-danger */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../../axios/axios';
import { Alert } from '../UI/Alert/Alert';
import { Button } from '../UI/Button/Button';
import { Card } from '../UI/Card/Card';
import { TextField } from '../UI/TextField/TextField';
import { Title } from '../UI/Title/Title';
import { Typography } from '../UI/Typography/Typography';
import { StyledButtonContainer, StyledContainer, StyledFieldContainer } from './styles';

export function ChangePassword() {
	const navigate = useNavigate();

	const newPasswordRef = useRef<null | HTMLInputElement>(null);
	const repeatPasswordRef = useRef<null | HTMLInputElement>(null);

	const [formError, setFormError] = useState<string[]>([]);
	const [newFormPassword, setNewFormPassword] = useState('');
	const [repeatFormPassword, setRepeatFormPassword] = useState('');

	const isValidPassword = (): boolean => {
		let isValid = true;
		if (newFormPassword === '') {
			setFormError((oldFormError) => [...oldFormError, 'Hasło nie może być puste.<br />']);
			isValid = false;
		}
		if (newFormPassword !== repeatFormPassword) {
			setFormError((oldFormError) => [...oldFormError, 'Hasła nie są identyczne.<br />']);
			isValid = false;
		}
		return isValid;
	};
	const savePassword = async () => {
		if (!isValidPassword()) {
			return;
		}
		if (!axios) {
			return;
		}
		try {
			const token = localStorage.getItem('token');
			await axios.post(
				'/user/changepassword',
				{ password: newFormPassword },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			navigate(-1);
		} catch (_err) {
			setFormError(['Błąd serwera.']);
		}
	};
	return (
		<Card padding>
			<StyledContainer>
				<Title caption="Zmiana hasła" />{' '}
				<>
					{formError.length > 0 && (
						<Alert>
							<Typography component="subtitle1" userSelect="none" color="#F44336">
								<div dangerouslySetInnerHTML={{ __html: formError.join('') }} />
							</Typography>
						</Alert>
					)}
				</>
				<StyledFieldContainer>
					<TextField
						id="password"
						type="password"
						label="Nowe hasło"
						required
						value={newFormPassword}
						setValue={setNewFormPassword}
						autoFocus
						autoComplete="off"
						forwardedRef={newPasswordRef}
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter' && repeatPasswordRef.current) {
								repeatPasswordRef.current.focus();
								event.preventDefault();
							}
						}}
					/>
				</StyledFieldContainer>
				<StyledFieldContainer>
					<TextField
						id="repeatPassword"
						type="password"
						label="Powtórz hasło"
						required
						value={repeatFormPassword}
						setValue={setRepeatFormPassword}
						autoFocus={false}
						autoComplete="off"
						forwardedRef={repeatPasswordRef}
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter') {
								event.preventDefault();
								setFormError([]);
								savePassword();
							}
						}}
					/>
				</StyledFieldContainer>
				<StyledButtonContainer>
					<Button
						onClick={() => {
							setFormError([]);
							savePassword();
						}}
						label="Zapisz"
						width={80}
						isMargin
					/>
					<Button
						onClick={() => {
							navigate(-1);
						}}
						label="Anuluj"
						width={80}
						isMargin={false}
						secondary
					/>
				</StyledButtonContainer>
			</StyledContainer>
		</Card>
	);
}
