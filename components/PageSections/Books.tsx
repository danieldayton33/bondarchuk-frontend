import { FunctionComponent } from 'react';
import { Page_Pagesections_PageSections_Books } from '../../generated/graphql';
import Image from 'next/image';
import Grid from '../Grid';
import BookCard from '../BookCard';
import Container from '../Container';
import GridItem from '../GridItem';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar';

const FlexGridItem = styled(GridItem)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const StyledFutureReleases = styled.div`
    position: relative;
    background: var(--color-secondary);
    min-height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        color: var(--white);
        text-transform: uppercase;
        text-align: center;
        padding-top: 1.5rem;
        font-family: var(--font-highlight), sans-serif;
        font-size: clamp(3.2rem, 4vw, 4.2rem);
        font-weight: 400;
        position: relative;
        z-index: 2;
        width: fit-content;
        display: flex;
        margin: 0;
        &:after {
            content: '';
            background: var(--color-secondary);
            width: 110%;
            position: absolute;
            height: 100%;
            top: 0;
            left: -5%;
            z-index: -1;
            border-radius: 100%;
        }
    }
    &:before {
        content: '';
        height: calc(100% - 6rem);
        width: calc(100% - 6rem);
        position: absolute;
        border: 1px solid var(--white);
        left: 3rem;
        top: 3rem;
    }
    &:after {
        content: '';
        height: calc(100% - 10rem);
        width: calc(100% - 10rem);
        position: absolute;
        border: 1px solid var(--white);
        left: 5rem;
        top: 5rem;
    }
    .bg-image {
        z-index: 0;
    }
`;
const FutureReleaseWrap = styled.div`
    padding: 2rem;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Books: FunctionComponent<Page_Pagesections_PageSections_Books> =
    function ({ books, displayAsFutureReleases }) {
        if (!books?.length) return <></>;
        return (
            <>
                {displayAsFutureReleases ? (
                    <Container maxWidth={'xxl'}>
                        <StyledFutureReleases>
                            <h2>Future Releases</h2>
                            <Image
                                src={
                                    '/images/future-releases-box-cursive-only.png'
                                }
                                layout={'fill'}
                                objectFit={'cover'}
                                alt={''}
                                className={'bg-image'}
                            />
                            <FutureReleaseWrap>
                                {books.map((book, i) => {
                                    if (!book) return <></>;
                                    const { title, booksFields } = book;
                                    return (
                                        <>
                                            <ProgressBar
                                                totalPages={
                                                    booksFields?.progress
                                                        ?.totalPages || 0
                                                }
                                                completePages={
                                                    booksFields?.progress
                                                        ?.completePages || 0
                                                }
                                                title={title || ''}
                                            />
                                        </>
                                    );
                                })}
                            </FutureReleaseWrap>
                        </StyledFutureReleases>
                    </Container>
                ) : (
                    <Container>
                        <Grid columns={2}>
                            {books.map((book, i) => {
                                if (!book) return <></>;
                                return (
                                    <FlexGridItem
                                        key={`${JSON.stringify(book)}-${i}`}
                                    >
                                        <BookCard {...book} />
                                    </FlexGridItem>
                                );
                            })}
                        </Grid>
                    </Container>
                )}
            </>
        );
    };

export default Books;
