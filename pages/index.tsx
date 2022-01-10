import { getAllBooks, getPage } from '../lib/queries';
import { Book, Page as PageType } from '../generated/graphql';
import { useQuery } from 'react-query';
import Page from '../components/Page';
import GridItem from '../components/GridItem';

interface Props {
    pageData: Array<PageType>;
    books: Array<Book>;
}
export default function Home({ pageData, books }: Props) {
    const { data } = useQuery('home-page', () => getPage({ uri: '/' }), {
        initialData: pageData,
        notifyOnChangeProps: 'tracked',
    });
    const { content } = data || {};
    return (
        <Page {...data}>
            {content && (
                <GridItem>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </GridItem>
            )}
        </Page>
    );
}

export async function getStaticProps({}) {
    const pageData = await getPage({ uri: '/' });
    const books = await getAllBooks({ first: 10 });
    return {
        props: {
            pageData,
            books,
        },
        revalidate: 300,
    };
}
