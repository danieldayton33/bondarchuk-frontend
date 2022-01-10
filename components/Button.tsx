import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledButton = styled.span`
    display: inline-block;
    margin: 2rem 0;
    background: var(--color-primary);
    color: var(--white);
    text-transform: uppercase;
    font-weight: 900;
    padding: 1rem 2rem;
    transition: 0.25s;
    box-shadow: var(--shadow-elevation-low);
    border-radius: 2rem;
    &:hover {
        background: var(--color-quaternary);
        transition: 0.25s;
    }
`;
interface Props {
    children?: ReactNode;
}
export default function Button({ children }: Props) {
    return <StyledButton>{children}</StyledButton>;
}
