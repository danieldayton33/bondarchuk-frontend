import styled from 'styled-components';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState, FunctionComponent } from 'react';
import classNames from 'classnames';
import { KeenSliderOptions } from 'keen-slider';

const SliderWrapper = styled.div`
    display: grid;
    .nav {
        padding: 4rem 0;
        button {
            padding: 0.25rem 0.25rem;
            border: none;
            &:first-of-type {
                margin-right: 1rem;
            }
            &:hover {
                cursor: pointer;
            }
        }
    }
    .dots {
        button {
            all: unset;
            font-family: var(--font-highlight);
            background: transparent;
            font-size: 1.5rem;
            margin-right: 1rem;
            color: var(--gray);
            padding: 0;
            transition: color 0.3s ease;
            &:after {
                content: '';
                display: inline-block;
                width: 0;
                height: 3px;
                background-color: var(--color-primary);
                transition: width 0.3s ease;
            }
            &.active {
                color: var(--color-primary);
                transition: color 0.3s ease;
                &:after {
                    margin-left: 2rem;
                    content: '';
                    display: inline-block;
                    width: 5rem;
                    height: 3px;
                    background-color: var(--color-primary);
                    transition: width 0.3s ease;
                }
            }
        }
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            right: 2rem;
        }
        &--flat {
            position: absolute;
            bottom: -0.25rem;
            width: 100%;
            display: flex;
            justify-content: flex-end;
            padding-right: 8rem;
            button {
                border-radius: 0;
                height: 0.25rem;
                width: 5rem;
                margin-right: 1rem;
                background: var(--gray-300);
                border: none;
                padding: 0;
                &.active {
                    background: var(--gray-900);
                    border: none;
                }
            }
        }
    }
`;

const StyledSlider = styled.div`
    margin-bottom: 3px;
    position: relative;
`;
const SlideToggle = styled.button`
    background: var(--gray-900);
`;
type Props = {
    elements: JSX.Element[] | null;
    options?: KeenSliderOptions;
    withDots?: boolean;
    withNav?: boolean;
    flatDots?: boolean;
};
const Slider: FunctionComponent<Props> = function ({
    elements,
    options = {},
    withDots = false,
    withNav = true,
    flatDots = false,
}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    // Check for an options parameter for looping the slides
    const loop = options?.loop || true;
    // Create the slider and
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        breakpoints: {
            '(min-width: 400px)': {
                slides: { perView: 2, spacing: 20 },
            },
            '(min-width: 1000px)': {
                slides: { perView: 3, spacing: 40 },
            },
        },
        slides: { perView: 1 },
        loop: loop,
        ...options,
    });
    if (!elements) return null;
    return (
        <SliderWrapper>
            <StyledSlider ref={sliderRef} className="keen-slider">
                {elements.map((element, i) => (
                    <div key={i} className="keen-slider__slide">
                        {element}
                    </div>
                ))}
            </StyledSlider>
            {loaded && instanceRef.current && withNav && (
                <div className="nav">
                    <SlideToggle
                        type={'button'}
                        title={'Previous'}
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={!loop && currentSlide === 0}
                    >
                        Previous
                    </SlideToggle>
                    <SlideToggle
                        title={'Next'}
                        onClick={(e: any) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            !loop &&
                            currentSlide ===
                                instanceRef.current.track.details.slides
                                    .length -
                                    1
                        }
                    >
                        Next
                    </SlideToggle>
                </div>
            )}
            {loaded && instanceRef.current && withDots && (
                <div
                    className={classNames({
                        dots: true,
                        ['dots--flat']: flatDots,
                    })}
                >
                    {Array.from(
                        Array(
                            instanceRef?.current?.track?.details?.slides.length,
                        ).keys(),
                    ).map((idx) => {
                        return (
                            <button
                                type={'button'}
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={
                                    'dot' +
                                    (currentSlide === idx ? ' active' : '')
                                }
                            >{`0${idx + 1}`}</button>
                        );
                    })}
                </div>
            )}
        </SliderWrapper>
    );
};

export default Slider;
