import styled from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const StyledProgress = styled.div`
    border-radius: 2rem;
    width: 200px;
    background: #f2f2f2;
    position: relative;
    height: 2rem;
    margin: 1rem 0 0.5rem;
    box-shadow: var(--shadow-elevation-low);
`;
const StyledSpan = styled.div`
    border-radius: 2rem;
    background: var(--color-secondary-100);
    box-shadow: var(--shadow-elevation-low);
    height: 2rem;
    position: absolute;
`;

const AnimatedSpan = animated(StyledSpan);
interface Props {
    totalPages: number;
    completePages: number;
}

export default function ProgressBar({ totalPages, completePages }: Props) {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
        triggerOnce: true,
    });
    const styles = useSpring({
        from: {
            width: 0,
        },
        to: {
            width: inView ? Math.floor((completePages / totalPages) * 200) : 0,
        },
        config: config.stiff,
    });

    return (
        <>
            <StyledProgress ref={ref}>
                <AnimatedSpan style={styles} inView={inView} />
            </StyledProgress>
            <div>{`${completePages} out of ${totalPages} pages`}</div>
        </>
    );
}
