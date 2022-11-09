import { FunctionComponent } from 'react';
import {
    Art,
    Maybe,
    Page_Pagesections_PageSections_CharacterArt,
} from '../../generated/graphql';
import Container from '../Container';
import Grid from '../Grid';
import { StyledPreTitle } from '../styled';
import GridItem from '../GridItem';
import parseHtml from 'html-react-parser';
import Image from 'next/image';
import Slider from '../Slider';
import styled from 'styled-components';

const StyledArtGrid = styled(Grid)`
    .art {
        &--image {
            min-height: 50rem;
            height: 80vh;
        }
        &--content {
            padding-top: 10rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            h2 {
                letter-spacing: 0.42rem;
            }
        }
        @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
            &--image {
                margin-top: 5rem;
                order: -1;
                height: 50vh;
            }
            &--content {
                padding-top: 3rem;
            }
        }
    }
`;

const StyledPreTitleGrid = styled(GridItem)`
    .pre-title {
        position: absolute;
        margin-left: -25rem;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        .pre-title {
            position: relative;
            margin-left: 0;
        }
    }
`;

const StyledSliderGridItem = styled(GridItem)`
    position: relative;
`;

const returnSlides = (art: Maybe<Art>[] | null) => {
    if (!art) return null;
    // @ts-ignore
    return art?.map(({ featuredImage, excerpt, title, artFields }, i) => {
        return (
            <StyledArtGrid key={`art-slide-${i}`} columns={2}>
                <GridItem className={'art--content'}>
                    {title && <h2>{title}</h2>}
                    {excerpt && parseHtml(excerpt)}
                </GridItem>
                {featuredImage && featuredImage?.node?.mediaItemUrl && (
                    <GridItem className="art--image">
                        <Image
                            layout={'fill'}
                            src={featuredImage?.node?.mediaItemUrl}
                            alt={
                                featuredImage?.node?.altText ||
                                title ||
                                'Featured Image'
                            }
                            objectFit={'cover'}
                        />
                    </GridItem>
                )}
            </StyledArtGrid>
        );
    });
};

const CharacterArt: FunctionComponent<
    Page_Pagesections_PageSections_CharacterArt
> = ({ art, preTitle }) => {
    return (
        <Container maxWidth={'xxl'}>
            <Grid columns={2}>
                {preTitle && (
                    <StyledPreTitleGrid span={1}>
                        <StyledPreTitle className={'pre-title'}>
                            {preTitle}
                        </StyledPreTitle>
                    </StyledPreTitleGrid>
                )}
                {art && art.length > 0 && (
                    <StyledSliderGridItem span={2}>
                        <div className={'slider-wrap'}>
                            <Slider
                                elements={returnSlides(art)}
                                withDots={true}
                                withNav={false}
                                options={{
                                    breakpoints: {
                                        '(max-width: 400px)': {
                                            slides: { perView: 1, spacing: 0 },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </StyledSliderGridItem>
                )}
            </Grid>
        </Container>
    );
};
export default CharacterArt;
