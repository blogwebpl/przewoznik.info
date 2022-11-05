import styled from 'styled-components';

export const StyledControl = styled.div`
	background-color: white;
	position: absolute;
	width: 100%;
	max-width: 520px;
	bottom: 24px;
	height: 104px;
	z-index: 400;
	opacity: 0.9;
	border: 1px solid rgba(63, 81, 181, 0.5);
`;

export const StyledSlider = styled.input`
	width: min(calc(100% - 2rem), 480px);
	display: block;
	margin: 0 auto;
	margin-top: 8px;
	accent-color: #3f51b5;
`;

export const StyledButtonContainer = styled.div`
	margin: 0 auto;
	padding: 0;
	display: flex;
	width: 336px;
	padding-bottom: 4px;
`;

export const StyledDate = styled.div`
	font-size: 14px;
	margin-top: 12px;
	height: 16px;
	text-align: center;
	user-select: none;
`;
