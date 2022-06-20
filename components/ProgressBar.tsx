import styled from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

const ProgressWrap = styled.div`
    width: 50%;
`;
const StyledProgress = styled.div`
    width: 100%;
    background: var(--color-secondary);
    position: relative;
    height: 2rem;
    margin: 1rem 0 0.5rem;
    box-shadow: var(--shadow-elevation-low);
    border: 1px solid var(--white);
`;
const StyledSpan = styled.div`
    background: var(--white);
    box-shadow: var(--shadow-elevation-low);
    height: calc(2rem - 2px);
    top: 0;
    position: absolute;
`;

const AnimatedSpan = animated(StyledSpan);
const TitleWrap = styled.div`
    color: var(--white);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
interface Props {
    totalPages: number;
    completePages: number;
    title?: string;
}

export default function ProgressBar({
    totalPages,
    completePages,
    title,
}: Props) {
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
            width: inView ? Math.floor((completePages / totalPages) * 500) : 0,
        },
        config: config.stiff,
    });

    return (
        <ProgressWrap>
            <TitleWrap>
                {title && <h3>{title}</h3>}
                <div>
                    <span className={'bold'}>{completePages}</span>
                    {`/${totalPages} words`}
                </div>
            </TitleWrap>

            <StyledProgress ref={ref}>
                <AnimatedSpan style={styles} inView={inView} />
            </StyledProgress>
        </ProgressWrap>
    );
}
