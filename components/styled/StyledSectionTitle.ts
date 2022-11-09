import styled from 'styled-components';

const StyledSectionTitle = styled.h2<{ center?: boolean }>`
    text-transform: uppercase;
    font-family: var(--font-highlight, sans-serif);
    font-size: clamp(3.5rem, 4vw, 4.8rem);
    text-align: ${(props) => (props.center ? 'center' : 'left')};
    color: var(--color-primary);
    margin-bottom: 1.5rem;
`;

export default StyledSectionTitle;
