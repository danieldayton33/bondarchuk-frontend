import styled from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';

const StyledProgress = styled.div`
    border-radius: 2rem;
    width: 200px;
    background: #f2f2f2;
    position: relative;
    height: 2rem;
    margin: 1rem 0 0.5rem;
`;
const StyledSpan = styled.div`
    border-radius: 2rem;
    background: var(--color-primary);
    height: 2rem;
    position: absolute;
`;

const AnimatedSpan = animated(StyledSpan);
interface Props {
    totalPages: number;
    completePages: number;
}

export default function ProgressBar({ totalPages, completePages }: Props) {
    const styles = useSpring({
        from: {
            width: 0,
        },
        to: {
            width: Math.floor((completePages / totalPages) * 200),
        },
        delay: 200,
        config: config.molasses,
    });
    return (
        <>
            <StyledProgress>
                <AnimatedSpan style={styles} />
            </StyledProgress>
            <div>{`${completePages} out of ${totalPages} pages`}</div>
        </>
    );
}
