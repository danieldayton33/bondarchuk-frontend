import {
    getAllBooks,
    getMenu,
    getPage,
    getThemeSettings,
} from '../lib/queries';
import {
    Book,
    MenuItem,
    Page as PageType,
    ThemeSettings_Themesettings,
} from '../generated/graphql';
import { useQuery } from 'react-query';
import Page from '../components/Page';
import GridItem from '../components/GridItem';

interface Props {
    pageData: Array<PageType>;
    books: Array<Book>;
    menuItems: Array<MenuItem>;
    themeSettings: ThemeSettings_Themesettings;
}
export default function Home({
    pageData,
    books,
    menuItems,
    themeSettings,
}: Props) {
    const { data } = useQuery('home-page', () => getPage({ uri: '/' }), {
        initialData: pageData,
        notifyOnChangeProps: 'tracked',
    });
    const { content } = data || {};
    return (
        <Page themeSettings={themeSettings} menuItems={menuItems} {...data}>
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
    const menuItems = await getMenu();
    const themeSettings = await getThemeSettings();
    const books = await getAllBooks({ first: 10 });
    return {
        props: {
            pageData,
            books,
            menuItems,
            themeSettings,
        },
        revalidate: 300,
    };
}
