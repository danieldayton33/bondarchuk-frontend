import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledGridItem = styled.div<{ padding: number; span: number }>`
    padding: ${(props) => props.padding}rem;
    grid-column: span ${(props) => props.span};
    position: relative;
`;
export default function GridItem({
    padding = 2,
    span = 1,
    children,
    className = '',
}: {
    padding?: number;
    children: ReactNode;
    span?: number;
    className?: string;
}) {
    return (
        <StyledGridItem padding={padding} span={span} className={className}>
            {children}
        </StyledGridItem>
    );
}
