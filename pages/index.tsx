import { getMenu, getPage, getThemeSettings } from '../lib/queries';
import {
    MenuItem,
    Page as PageType,
    ThemeSettings_Themesettings,
} from '../generated/graphql';
import { useQuery } from 'react-query';
import Page from '../components/Page';
import GridItem from '../components/GridItem';
import PageSectionLoader from '../components/PageSectionLoader';

interface Props {
    pageData: Array<PageType>;
    menuItems: Array<MenuItem>;
    themeSettings: ThemeSettings_Themesettings;
}
export default function Home({ pageData, menuItems, themeSettings }: Props) {
    const { data } = useQuery('home-page', () => getPage({ uri: '/' }), {
        initialData: pageData,
        notifyOnChangeProps: 'tracked',
    });
    const { content, PageSections } = data || {};
    return (
        <Page themeSettings={themeSettings} menuItems={menuItems} {...data}>
            {content && (
                <GridItem>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </GridItem>
            )}
            {PageSections?.pageSections && (
                <PageSectionLoader pageSections={PageSections.pageSections} />
            )}
        </Page>
    );
}

export async function getStaticProps({}) {
    const pageData = await getPage({ uri: '/' });
    const menuItems = await getMenu();
    const themeSettings = await getThemeSettings();
    return {
        props: {
            pageData,
            menuItems,
            themeSettings,
        },
        revalidate: 300,
    };
}
