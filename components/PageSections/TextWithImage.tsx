import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Page_Pagesections_PageSections_TextWithImage } from '../../generated/graphql';
import Grid from '../Grid';
import GridItem from '../GridItem';
import Container from '../Container';
import classNames from 'classnames';
import { StyledPreTitle, StyledSectionTitle } from '../styled';
import SocialLinks from '../SocialLinks';

const StyledImageItem = styled(GridItem)<{ left: boolean }>`
    order: ${(props) => (props.left ? -1 : 1)};
    position: relative;
    padding: 4rem;
    min-height: 35rem;
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 2rem;
        left: 2rem;
        height: 100%;
        width: 100%;
        border: 1px solid var(--color-secondary);
    }
    &:after {
        top: 3rem;
        left: 3rem;
        z-index: -1;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        order: -1;
        &:before,
        &:after {
            top: 0.5rem;
            left: 0.5rem;
        }
        &:after {
            top: 1rem;
            left: 1rem;
        }
    }
`;
const StyledContent = styled(GridItem)`
    .pre-title {
        margin-left: calc(-1 * clamp(0rem, 4vw, 10rem));
        text-align: left;
    }
    .content-wrap {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 4rem 6rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        .pre-title {
            margin-left: 0;
            text-align: center;
        }
    }
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        .content-wrap {
            padding: 4rem 2rem;
        }
    }
`;

const FollowMeDiv = styled.div<{ linkWidth: number }>`
    display: grid;
    grid-template-columns: 1fr auto;
    h4 {
        text-transform: uppercase;
        margin: 0;
        font-weight: 400;
        letter-spacing: 1.4px;
        position: relative;
        display: flex;
        align-items: center;
        &:after {
            content: '';
            position: absolute;
            width: ${(props) => `calc(100% - ${props.linkWidth + 40}px)`};
            height: 1px;
            background: var(--color-secondary);
            top: calc(50% - 1px);
            right: 10px;
        }
    }
`;

const TextWithImage: FunctionComponent<Page_Pagesections_PageSections_TextWithImage> =
    function ({
        content,
        image,
        addSocialLinks,
        title,
        preTitle,
        imageOnLeft,
    }) {
        const ref = useRef<HTMLDivElement | null>(null);
        const [width, setWidth] = useState(0);
        useEffect(() => {
            if (ref.current) {
                setWidth(ref.current?.clientWidth);
            }
        }, []);
        return (
            <Container maxWidth={'xxl'}>
                <Grid>
                    {content && (
                        <StyledContent>
                            {preTitle && (
                                <StyledPreTitle className={'pre-title'}>
                                    {preTitle}
                                </StyledPreTitle>
                            )}
                            <div className={'content-wrap'}>
                                {title && (
                                    <StyledSectionTitle center={false}>
                                        {title}
                                    </StyledSectionTitle>
                                )}

                                <div
                                    className={classNames({
                                        'section-content': true,
                                    })}
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                                {addSocialLinks && (
                                    <FollowMeDiv linkWidth={width}>
                                        <h4>Follow Me</h4>
                                        <div
                                            className={'social-links'}
                                            ref={ref}
                                        >
                                            <SocialLinks isDark={true} />
                                        </div>
                                    </FollowMeDiv>
                                )}
                            </div>
                        </StyledContent>
                    )}
                    {image?.mediaItemUrl && (
                        <StyledImageItem left={imageOnLeft || false}>
                            <Image
                                layout={'fill'}
                                src={image?.mediaItemUrl}
                                alt={image.altText || ''}
                                objectFit={'cover'}
                            />
                        </StyledImageItem>
                    )}
                </Grid>
            </Container>
        );
    };

export default TextWithImage;
