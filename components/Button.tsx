import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledButton = styled.span<{ theme: string }>`
    display: inline-block;
    margin: 2rem 0;
    color: ${(props) =>
        props.theme === 'light' ? 'var(--white)' : 'var(--color-primary)'};
    text-transform: uppercase;
    padding: 1.5rem 2rem;
    min-width: 150px;
    text-align: center;
    transition: 0.25s;
    box-shadow: var(--shadow-elevation-low);
    font-size: 1.2rem;
    font-weight: 700;
    font-family: var(--font-highlight), cursive;
    letter-spacing: 0.15rem;
    line-height: 1rem;
    border: 1px solid
        ${(props) =>
            props.theme === 'light' ? 'var(--white)' : 'var(--color-primary)'};
    position: relative;
    &:after {
        height: calc(100% + 1rem);
        content: '';
        width: calc(100% - 1rem);
        top: -0.5rem;
        left: 0.5rem;
        position: absolute;
        border: 1px solid
            ${(props) =>
                props.theme === 'light'
                    ? 'var(--white)'
                    : 'var(--color-primary)'};
    }
    &:before {
        content: '';
        height: 100%;
        width: 0;
        position: absolute;
        top: 0;
        left: 0.5rem;
        background: ${(props) =>
            props.theme === 'light' ? 'var(--white)' : 'var(--color-primary)'};
        transition: 0.25s;
        z-index: -1;
    }
    &:hover {
        color: ${(props) =>
            props.theme === 'light' ? 'var(--color-primary)' : 'var(--white)'};
        transition: 0.25s;
        &:before {
            width: calc(100% - 1rem);
            transition: 0.25s;
        }
    }
`;
interface Props {
    children?: ReactNode;
    theme?: string;
}
export default function Button({ children, theme = 'dark' }: Props) {
    return <StyledButton theme={theme}>{children}</StyledButton>;
}
