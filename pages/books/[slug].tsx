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
    MenuItem,
    ThemeSettings_Themesettings,
} from '../../generated/graphql';
import { GetStaticPropsContext } from 'next';
import { useQuery } from 'react-query';
import Page from '../../components/Page';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';
import Grid from '../../components/Grid';
import styled from 'styled-components';
import GridItem from '../../components/GridItem';
import { ParsedUrlQuery } from 'querystring';

const BookWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;
const CoverWrap = styled(GridItem)`
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    const {
        amazonLink,
        goodReadsLink,
        isComplete,
        completionDate,
        progress,
        coverImage,
    } = booksFields || {};
    return (
        <Page
            featuredImage={featuredImage}
            title={title}
            seo={seo}
            menuItems={menuItems}
            themeSettings={themeSettings}
        >
            <Grid columns={3}>
                <CoverWrap>
                    {coverImage && coverImage?.mediaItemUrl && (
                        <Image
                            height={400}
                            width={300}
                            objectFit={'contain'}
                            src={coverImage.mediaItemUrl}
                            alt={
                                coverImage.altText || `Cover Image for ${title}`
                            }
                        />
                    )}
                    <BookWrap>
                        {amazonLink?.url && (
                            <Link href={amazonLink.url} passHref={true}>
                                <a
                                    target={amazonLink.target || '_self'}
                                    title={amazonLink.title || 'Amazon Link'}
                                >
                                    <Button>Buy Now</Button>
                                </a>
                            </Link>
                        )}
                        {goodReadsLink?.url && (
                            <Link href={goodReadsLink.url} passHref={true}>
                                <a
                                    target={goodReadsLink.target || '_self'}
                                    title={
                                        goodReadsLink.title || 'Good Reads Link'
                                    }
                                >
                                    <Button>Good Reads</Button>
                                </a>
                            </Link>
                        )}
                    </BookWrap>

                    {!isComplete &&
                        progress?.completePages &&
                        progress?.totalPages && (
                            <ProgressBar
                                totalPages={progress.totalPages}
                                completePages={progress.completePages}
                            />
                        )}
                    {completionDate && (
                        <div>
                            {isComplete ? 'Publish Date' : 'Expected Release'}:{' '}
                            {completionDate}
                        </div>
                    )}
                </CoverWrap>
                {content && (
                    <GridItem span={2}>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </GridItem>
                )}
            </Grid>
        </Page>
    );
}

interface IParams extends ParsedUrlQuery {
    slug: string;
}
export async function getStaticProps(context: GetStaticPropsContext) {
    const slug = context?.params?.slug as unknown as IParams;
    // @ts-ignore
    const bookData = await getBookBySlug({ slug: slug });
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
