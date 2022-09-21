import styled from 'styled-components';

export const StyledSideMenu = styled.div<{ isSideMenuOpen: boolean }>`
	background-color: ${(props) => props.theme.palette.background.paper};
	width: 320px;
	box-shadow: ${(props) => props.theme.shadows[3]};
	position: fixed;
	transform: ${(props) => (props.isSideMenuOpen ? 'translate(0px)' : 'translate(101%)')};
	transition: transform 0.25s ease-in-out 0s;
	right: 0;
	bottom: 0;
	@media (orientation: landscape) {
		top: 48px;
	}
	@media (orientation: portrait) {
		top: 56px;
	}
	@media (min-width: ${(props) => props.theme.breakpoints.sm}) {
		top: 64px;
	}
`;
