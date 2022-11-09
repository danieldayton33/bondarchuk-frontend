import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div<{ maxWidth: string; padding: string }>`
    margin: 0 auto;
    max-width: ${(props) =>
        props.theme.breakpoints[props.maxWidth] || '1200px'};
    padding: ${(props) => props.padding || '10rem 0'};
`;
type Props = {
    className?: string;
    maxWidth?: string;
    padding?: string;
    children: ReactNode;
};
const Container: FunctionComponent<Props> = function ({
    className,
    maxWidth = 'lg',
    children,
    padding = '5rem 0',
}) {
    return (
        <StyledContainer
            className={className}
            maxWidth={maxWidth}
            padding={padding}
        >
            {children}
        </StyledContainer>
    );
};

export default Container;
