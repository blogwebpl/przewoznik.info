import styled from 'styled-components';

export const StyledLoadRoute = styled.div`
	background-color: white;
	position: absolute;
	width: 100%;
	max-width: 520px;
	bottom: 124px;
	height: 104px;
	z-index: 400;
	opacity: 0.9;
	border: 1px solid rgba(63, 81, 181, 0.5);
`;

export const StyledInput = styled.input`
	padding: 4px;
	height: 24px;
	border: 1px solid rgba(63, 81, 181, 0.5);
	margin: 4px;
	width: 100%;
	&[type='date'] {
		max-width: 110px;
	}
	&[type='time'] {
		max-width: 97px;
	}
`;

export const StyledContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 4px;
`;

export const StyledSelect = styled.select`
	option {
		padding: 4px;
	}

	height: 24px;
	margin: 4px;
	width: 250px;
	border: 1px solid rgba(63, 81, 181, 0.5);
`;
