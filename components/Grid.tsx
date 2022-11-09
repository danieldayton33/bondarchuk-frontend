import styled from 'styled-components';
import { ReactNode } from 'react';

interface GridProps {
    columns: number;
    background: string;
}
const StyledGrid = styled.div<GridProps>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    background: ${(props) => props.background};
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: 1fr;
    }
`;
interface Props {
    columns?: number;
    children?: ReactNode;
    background?: string;
    className?: string;
}
export default function Grid({
    columns = 2,
    children,
    background,
    className = '',
}: Props) {
    return (
        <StyledGrid
            columns={columns}
            background={background || 'transparent'}
            className={className}
        >
            {children}
        </StyledGrid>
    );
}
