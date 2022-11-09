import {
    getAllBooks,
    getBookBySlug,
    getMenu,
    getThemeSettings,
} from '../../lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import {
    Book,
    Maybe,
    MenuItem,
    ThemeSettings_Themesettings,
} from '../../generated/graphql';
import { GetStaticPropsContext } from 'next';
import { useQuery } from 'react-query';
import Page from '../../components/Page';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import styled from 'styled-components';
import GridItem from '../../components/GridItem';
import Container from '../../components/Container';
import { FlexGridItem } from '../../components/PageSections/Books';
import { StyledPreTitle, StyledSectionTitle } from '../../components/styled';
import BookCard from '../../components/BookCard';

const BookWrap = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    margin-top: 4rem;
    border-top: 1px solid var(--color-primary);
`;
const StyledFlexGirdItem = styled(FlexGridItem)`
    .image-wrap {
        box-shadow: var(--shadow-elevation-medium);
    }
`;

const RelatedFlexGridItem = styled(FlexGridItem)`
    flex-direction: column;
    .related-title {
        font-family: var(--font-highlight), sans-serif;
    }
`;
const StyledGridItem = styled(GridItem)`
    .book-title {
        &:after {
            margin-top: 2rem;
            content: '';
            display: block;
            width: 5rem;
            height: 3px;
            background-color: var(--color-primary);
        }
    }
`;
export default function SingleBook({
    bookData,
    menuItems,
    themeSettings,
}: {
    bookData: Book;
    menuItems: Array<MenuItem>;
    themeSettings: ThemeSettings_Themesettings;
}) {
    const { data } = useQuery(
        `book-${bookData.slug}`,
        async () => await getBookBySlug({ slug: bookData.slug || '' }),
        {
            initialData: bookData,
            notifyOnChangeProps: 'tracked',
        },
    );
    if (!data) return <h1>Loading...</h1>;
    const { title, featuredImage, content, seo, booksFields }: Book = data;
    const { amazonLink, goodReadsLink, coverImage, seriesTitle, relatedBooks } =
        booksFields || {};
    return (
        <Page
            featuredImage={featuredImage}
            title={title}
            seo={seo}
            menuItems={menuItems}
            themeSettings={themeSettings}
            preTitle={'Books'}
        >
            <Container maxWidth={'xl'}>
                <Grid columns={2}>
                    <StyledFlexGirdItem>
                        {coverImage && coverImage?.mediaItemUrl && (
                            <div className={'image-wrap'}>
                                <Image
                                    height={600}
                                    width={400}
                                    objectFit={'cover'}
                                    src={coverImage.mediaItemUrl}
                                    alt={
                                        coverImage.altText ||
                                        `Cover Image for ${title}`
                                    }
                                />
                            </div>
                        )}
                    </StyledFlexGirdItem>

                    {content && (
                        <StyledGridItem>
                            <h4 className={'uppercase-wide'}>{seriesTitle}</h4>
                            <h2 className={'book-title'}>{title}</h2>
                            <div
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                            <BookWrap>
                                {amazonLink?.url && (
                                    <Link href={amazonLink.url} passHref={true}>
                                        <a
                                            target={
                                                amazonLink.target || '_self'
                                            }
                                            title={
                                                amazonLink.title ||
                                                'Amazon Link'
                                            }
                                        >
                                            <Button>Buy Now</Button>
                                        </a>
                                    </Link>
                                )}
                                {goodReadsLink?.url && (
                                    <Link
                                        href={goodReadsLink.url}
                                        passHref={true}
                                    >
                                        <a
                                            target={
                                                goodReadsLink.target || '_self'
                                            }
                                            title={
                                                goodReadsLink.title ||
                                                'Good Reads Link'
                                            }
                                        >
                                            <Button>Good Reads</Button>
                                        </a>
                                    </Link>
                                )}
                            </BookWrap>
                        </StyledGridItem>
                    )}
                </Grid>
            </Container>
            {relatedBooks && relatedBooks.length > 0 && (
                <Container padding={'0 0 5rem'}>
                    <Grid columns={3}>
                        <GridItem span={3}>
                            <StyledPreTitle className={'pre-title'}>
                                Related Books
                            </StyledPreTitle>
                            <StyledSectionTitle center={true}>
                                Related Books
                            </StyledSectionTitle>
                        </GridItem>
                        {relatedBooks.map((book: Maybe<Book>, i) => {
                            if (!book) return null;
                            return (
                                <RelatedFlexGridItem
                                    key={`book-card-related-${i}`}
                                >
                                    <BookCard
                                        {...book}
                                        isRelated={true}
                                        showExcerpt={false}
                                    />
                                    <h3 className={'related-title'}>
                                        {book.title}
                                    </h3>
                                </RelatedFlexGridItem>
                            );
                        })}
                    </Grid>
                </Container>
            )}
        </Page>
    );
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const slug = context?.params?.slug || '';
    const bookData = await getBookBySlug({ slug: slug.toString() });
    const menuItems = await getMenu();
    const themeSettings = await getThemeSettings();
    return {
        props: { bookData, menuItems, themeSettings },
        revalidate: 300,
    };
}

export async function getStaticPaths() {
    const books = await getAllBooks({ first: 20 });

    return {
        paths: books.map((book: Book) => `/books/${book.slug}`) || [],
        fallback: 'blocking',
    };
}
