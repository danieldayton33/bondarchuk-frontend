import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Page_Pagesections_PageSections_InstagramImages } from '../../generated/graphql';
import Image from 'next/image';
import { DEFAULT_FEATURED } from '../../lib/constants';
import Grid from '../Grid';
import GridItem from '../GridItem';
import styled from 'styled-components';
import { useThemeSettings } from '../../lib/utils';
import classNames from 'classnames';

const StyledBGImage = styled(Image)`
    z-index: -1;
`;

const StyledContainer = styled.div<{ width: number }>`
    position: relative;
    margin: 0 -2rem;
    color: var(--white);
    &.cursor-pointer {
        &:hover {
            cursor: pointer;
        }
    }
    h2 {
        text-align: center;
        width: fit-content;
        margin: 0 auto;
        span {
            margin: auto 2rem auto 0;
            font-size: 1.5rem;
        }
        &:before,
        &:after {
            content: '';
            height: 1px;
            width: ${(props) => `calc(50vw - ${props.width / 2}px - 2rem)`};
            top: calc(50% - 1px);
            background: var(--white);
            position: absolute;
            display: block;
        }
        &:before {
            left: 0;
        }
        &:after {
            right: 0;
        }
    }
`;
const StyledInstagramImages = styled.div`
    display: flex;
    flex-wrap: wrap;
    .instagram-image {
        position: relative;
        aspect-ratio: 1/1;
        max-width: 100%;
        flex: 1 1 25%;
        @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
            flex: 1 1 50%;
        }
    }
`;
const InstagramImages: FunctionComponent<
    Page_Pagesections_PageSections_InstagramImages
> = ({ images, instagramHandle }) => {
    const themeSettings = useThemeSettings();
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { instgram } = themeSettings?.themeSettings?.socialLinks || {};
    function handleClick() {
        if (instgram?.url) {
            window.open(instgram.url, '_blank');
        }
    }
    const handleResize = () => {
        if (ref?.current) {
            setWidth(ref.current.clientWidth);
        }
    };

    useEffect(() => {
        handleResize();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return (
        <StyledContainer
            onClick={handleClick}
            className={classNames({
                'cursor-pointer': instgram?.url,
            })}
            width={width}
        >
            <Grid columns={1}>
                <GridItem span={1}>
                    <h2 ref={ref}>
                        <span>
                            {/*<FontAwesomeIcon*/}
                            {/*    size={'1x'}*/}
                            {/*    icon={faInstagram}*/}
                            {/*    color={'var(--white)'}*/}
                            {/*/>*/}
                        </span>

                        {instagramHandle}
                    </h2>
                </GridItem>
                <StyledInstagramImages>
                    {images &&
                        images.map((image, i) => {
                            if (image?.mediaItemUrl) {
                                return (
                                    <div
                                        className={'instagram-image'}
                                        key={`instagram-image-${i}`}
                                    >
                                        <Image
                                            src={image.mediaItemUrl}
                                            alt={`Instagram Image ${i}`}
                                            layout={'fill'}
                                            objectFit={'cover'}
                                        />
                                    </div>
                                );
                            }
                        })}
                </StyledInstagramImages>
            </Grid>

            <StyledBGImage
                src={DEFAULT_FEATURED.node.mediaItemUrl}
                layout={'fill'}
                objectFit={'cover'}
                alt={''}
            />
        </StyledContainer>
    );
};
export default InstagramImages;
