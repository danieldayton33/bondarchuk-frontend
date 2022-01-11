import {
    getAllPages,
    getMenu,
    getPage,
    getThemeSettings,
} from '../lib/queries';
import {
    MenuItem,
    Page as PageType,
    ThemeSettings_Themesettings,
} from '../generated/graphql';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useQuery } from 'react-query';
import GridItem from '../components/GridItem';
import Page from '../components/Page';

export default function DefaultPage({
    pageData,
    menuItems,
    themeSettings,
    slug,
}: {
    pageData: PageType;
    menuItems: Array<MenuItem>;
    themeSettings: ThemeSettings_Themesettings;
    slug: string;
}) {
    const { data } = useQuery(
        `page-${slug}`,
        () => getPage({ uri: `/${slug}` }),
        {
            initialData: pageData,
            notifyOnChangeProps: 'tracked',
        },
    );
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

interface IParams extends ParsedUrlQuery {
    slug: string;
}
export async function getStaticProps(context: GetStaticPropsContext) {
    const slug = context?.params?.slug as unknown as IParams;
    const pageData = await getPage({ uri: `/${slug}` });
    const menuItems = await getMenu();
    const themeSettings = await getThemeSettings();
    return {
        props: {
            pageData,
            menuItems,
            themeSettings,
            slug,
        },
        revalidate: 300,
    };
}
export async function getStaticPaths() {
    const allPages = await getAllPages();
    const allButHome = allPages.filter((page: PageType) => !page.isFrontPage);
    return {
        paths: allButHome.map((page: PageType) => `/${page.slug}`),
        fallback: 'blocking',
    };
}
