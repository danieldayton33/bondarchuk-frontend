import { getAllBooks, getBookBySlug } from '../../lib/queries';
import Image from 'next/image';
import { Book } from '../../generated/graphql';
import { GetStaticPropsContext } from 'next';
import { useQuery } from 'react-query';

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
    const { title, featuredImage, content, date, seo }: Book = data;
    return (
        <>
            <h1>{title}</h1>
            {featuredImage?.node?.mediaItemUrl && (
                <Image
                    src={featuredImage.node?.mediaItemUrl}
                    height={500}
                    width={500}
                    objectFit={'contain'}
                />
            )}
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        </>
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
