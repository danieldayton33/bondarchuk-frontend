import { getAllBooks, getBookBySlug } from '../../lib/queries';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '../../generated/graphql';
import { GetStaticPropsContext } from 'next';
import { useQuery } from 'react-query';
import Page from '../../components/Page';
import ProgressBar from '../../components/ProgressBar';

export default function SingleBook({ bookData }: { bookData: Book }) {
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
        <Page featuredImage={featuredImage} title={title} seo={seo}>
            {coverImage && coverImage?.mediaItemUrl && (
                <Image
                    height={400}
                    width={300}
                    objectFit={'contain'}
                    src={coverImage.mediaItemUrl}
                    alt={coverImage.altText || `Cover Image for ${title}`}
                />
            )}
            {amazonLink?.url && (
                <Link href={amazonLink.url} passHref={true}>
                    <a
                        target={amazonLink.target || '_self'}
                        title={amazonLink.title || 'Amazon Link'}
                    >
                        Buy Now
                    </a>
                </Link>
            )}
            {goodReadsLink?.url && (
                <Link href={goodReadsLink.url} passHref={true}>
                    <a
                        target={goodReadsLink.target || '_self'}
                        title={goodReadsLink.title || 'Good Reads Link'}
                    >
                        Good Reads
                    </a>
                </Link>
            )}
            {!isComplete && progress?.completePages && progress?.totalPages && (
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
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </Page>
    );
}

export async function getStaticProps({
    params,
}: {
    params: GetStaticPropsContext;
}) {
    const slug = params.slug;
    const bookData = await getBookBySlug({ slug: slug });
    return {
        props: { bookData },
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
