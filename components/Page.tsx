import {
    Maybe,
    MenuItem,
    NodeWithFeaturedImageToMediaItemConnectionEdge,
    PostTypeSeo,
    ThemeSettings_Themesettings,
} from '../generated/graphql';
import styled from 'styled-components';
import Header from './Header';
import YoastSeo from './YoastSeo';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { getMenu, getThemeSettings } from '../lib/queries';
import Nav from './Nav';
import Footer from './Footer';

const Wrapper = styled.div`
    margin: 5rem auto;
    padding: 2rem;
`;

interface Props {
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    title?: Maybe<String>;
    children?: ReactNode;
    seo?: Maybe<PostTypeSeo>;
    menuItems?: Array<MenuItem>;
    themeSettings?: ThemeSettings_Themesettings;
    isFrontPage?: boolean;
}

export default function Page({
    featuredImage,
    title,
    seo,
    isFrontPage,
    children,
    menuItems,
    themeSettings,
}: Props) {
    const { data: menu } = useQuery('menu-items', getMenu, {
        initialData: menuItems,
        notifyOnChangeProps: 'tracked',
    });
    const { data: theme } = useQuery('theme-settings', getThemeSettings, {
        initialData: themeSettings,
        notifyOnChangeProps: 'tracked',
    });
    return (
        <>
            {seo && <YoastSeo seo={seo} />}
            <main>
                <Nav
                    themeSettings={theme}
                    menuItems={menu}
                    isFrontPage={isFrontPage}
                />
                <Header
                    featuredImage={featuredImage}
                    title={title}
                    isFrontPage={isFrontPage}
                    themeSettings={theme}
                />
                <Wrapper>{children}</Wrapper>
                <Footer themeSettings={themeSettings} menuItems={menu} />
            </main>
        </>
    );
}
