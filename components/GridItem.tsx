import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledGridItem = styled.div<{ padding: number; span: number }>`
    padding: ${(props) => props.padding}rem;
    grid-column: span ${(props) => props.span};
`;
export default function GridItem({
    padding = 2,
    span = 1,
    children,
}: {
    padding?: number;
    children: ReactNode;
    span?: number;
}) {
    return (
        <StyledGridItem padding={padding} span={span}>
            {children}
        </StyledGridItem>
    );
}
