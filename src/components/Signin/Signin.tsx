/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-danger */
import React, { useEffect, useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import axios from '../../axios/axios';
import { setEmail, setRole, setRoles, setIsSignin, setVehicles } from '../../features/userSlice';
import isEmail from '../../functions/isEmail';
import { Alert } from '../UI/Alert/Alert';
import { Button } from '../UI/Button/Button';
import { Card } from '../UI/Card/Card';
import { Checkbox } from '../UI/Checkbox/Checkbox';
import { FieldContainer } from '../UI/FieldContainer/FieldContainer';
import { TextField } from '../UI/TextField/TextField';
import { Typography } from '../UI/Typography/Typography';
import { StyledLogo } from './styles';

export function Signin() {
	const emailRef = useRef<null | HTMLInputElement>(null);
	const passwordRef = useRef<null | HTMLInputElement>(null);

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const [formEmail, setFormEmail] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [pending, setPending] = useState(false);
	const [formRememberEmail, setFormRememberEmail] = useState(false);
	const [formError, setFormError] = useState<string[]>([]);

	const saveEmailToLocalStorage = () => {
		if (formRememberEmail && isEmail(formEmail)) {
			localStorage.setItem('email', formEmail);
		} else {
			localStorage.removeItem('email');
		}
	};

	const isFormValid = (): boolean => {
		let isValid: boolean = true;
		if (!isEmail(formEmail)) {
			setFormError((oldError) => [...oldError, 'Nieprawidłowy email.<br />']);
			isValid = false;
		}
		if (!formPassword) {
			setFormError((oldError) => [...oldError, 'Hasło nie może być puste.<br />']);
			isValid = false;
		}
		return isValid;
	};

	const setErrorFromAxios = (status: number): void => {
		switch (status) {
			case 400:
				setFormError(['Podano nieprawidłowe dane.']);
				break;
			case 401:
				setFormError(['Nieprawidłowy email lub hasło.']);
				break;
			case 500:
				setFormError(['Błąd serwera.']);
				break;
			default:
				setFormError(['Brak komunikacji z serwerem.']);
		}
	};

	const isValidToken = (token: string): boolean => {
		const parsedToken: { email: string } = jwtDecode(token);
		return parsedToken.email === formEmail;
	};

	interface PostSigninResponse
		extends AxiosResponse<{ token: string; role: string; roles: string[]; vehicles: any[] }> {}

	const axiosPostSignin = async () => {
		if (!axios) return;
		const response: PostSigninResponse = await axios.post('user/signin', {
			email: formEmail,
			password: formPassword,
		});
		const { token, role, roles, vehicles } = response.data;

		if (isValidToken(token)) {
			localStorage.setItem('token', token);
			dispatch(setIsSignin(true));
			dispatch(setRoles(roles));
			dispatch(setRole(role));
			dispatch(setEmail(formEmail));
			dispatch(setVehicles(vehicles));
			const { state } = location;
			if (state) {
				navigate(state.from);
			} else {
				navigate('/map');
			}
		} else {
			localStorage.removeItem('token');
			setFormError(['Otrzymano nieprawidłowy token']);
		}
	};

	const postSignin = async (event?: any) => {
		if (event) event.preventDefault();
		setPending(true);
		saveEmailToLocalStorage();
		setFormError([]);
		if (!isFormValid()) {
			setPending(false);
			return;
		}

		try {
			await axiosPostSignin();
		} catch (err: any) {
			localStorage.removeItem('token');
			if (err.isAxiosError) {
				setErrorFromAxios(err.response.status);
			} else {
				setFormError(['Nieznany błąd.']);
			}
		} finally {
			setPending(false);
			if (passwordRef.current) {
				passwordRef.current.focus();
			}
		}
	};

	const setEmailFocus = () => {
		if (emailRef.current) {
			emailRef.current.focus();
		}
	};

	const setPasswordFocus = () => {
		if (passwordRef.current) {
			passwordRef.current.focus();
		}
	};

	useEffect(() => {
		const localEmail: string = localStorage.getItem('email') || '';
		if (isEmail(localEmail)) {
			setFormEmail(localEmail);
			setFormRememberEmail(true);
			setPasswordFocus();
		} else setEmailFocus();
	}, []);

	return (
		<Card padding maxWidth={320}>
			<StyledLogo src={logo} alt="" />
			<Typography component="h6" userSelect="none">
				Zaloguj się
			</Typography>
			<>
				{formError.length > 0 && (
					<Alert>
						<Typography component="subtitle1" userSelect="none" color="#F44336">
							<div dangerouslySetInnerHTML={{ __html: formError.join('') }} />
						</Typography>
					</Alert>
				)}
			</>
			<form>
				<FieldContainer>
					<TextField
						id="email"
						label="E-mail"
						required
						type="email"
						value={formEmail}
						setValue={setFormEmail}
						forwardedRef={emailRef}
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter' && passwordRef.current) {
								passwordRef.current.focus();
								event.preventDefault();
							}
						}}
						autoComplete="username"
					/>
				</FieldContainer>
				<FieldContainer>
					<TextField
						id="password"
						label="Hasło"
						required
						type="password"
						value={formPassword}
						setValue={setFormPassword}
						forwardedRef={passwordRef}
						onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
							if (event.key === 'Enter' && passwordRef.current && formPassword !== '') {
								postSignin();
								event.preventDefault();
							} else if (event.key === 'Enter' && passwordRef.current) {
								event.preventDefault();
							}
						}}
						autoComplete="current-password"
					/>
				</FieldContainer>
				<Checkbox
					id="checkbox"
					label="Zapamiętaj e-mail"
					edge="start"
					checked={formRememberEmail}
					setChecked={setFormRememberEmail}
				/>
				<FieldContainer>
					<Button id="submit" label="ZALOGUJ SIĘ" onClick={postSignin} disabled={pending} />
				</FieldContainer>
			</form>
		</Card>
	);
}
