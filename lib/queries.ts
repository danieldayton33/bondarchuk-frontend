import { gql, request } from 'graphql-request';
import { getQueryUri } from './utils';
import {
    MENU_QUERY,
    PageSectionFragment,
    THEME_SETTINGS,
    BOOK_FRAGMENT,
} from './fragments';

export async function getPage({ uri = '' }) {
    const data = await request(
        getQueryUri(),
        gql`
            query PageQuery($uri: String!) {
                nodeByUri(uri: $uri) {
                    __typename
                    ... on ContentType {
                        id
                        name
                    }
                    ... on Page {
                        isFrontPage
                        id
                        title
                        content
                        featuredImage {
                            node {
                                altText
                                mediaItemUrl
                            }
                        }
                        slug
                        title
                        seo {
                            title
                            metaDesc
                            fullHead
                        }
                    }
                    ...PageSectionFragment
                    ... on Post {
                        title
                        content
                        date
                        slug
                        seo {
                            title
                            metaDesc
                            fullHead
                        }
                    }
                }
            }
            ${PageSectionFragment}
        `,
        { uri: uri },
    );
    return data?.nodeByUri;
}

export async function getMenu() {
    const data = await request(getQueryUri(), MENU_QUERY);
    return data?.menu?.menuItems?.nodes;
}
export async function getAllBooks({ first = 10 }) {
    const data = await request(
        getQueryUri(),
        gql`
            query getAllBooks($first: Int) {
                books(first: $first) {
                    nodes {
                        ...BookFragment
                    }
                }
            }
            ${BOOK_FRAGMENT}
        `,
        {
            first: first,
        },
    );

    return data?.books?.nodes;
}

export async function getBookBySlug({ slug = '' }) {
    const data = await request(
        getQueryUri(),
        gql`
            query getBookBySlug($id: ID!) {
                book(id: $id, idType: SLUG) {
                    ...BookFragment
                }
            }
            ${BOOK_FRAGMENT}
        `,
        { id: slug },
    );
    return data?.book;
}

export async function getThemeSettings() {
    const data = await request(getQueryUri(), THEME_SETTINGS);
    return data?.themeSettings?.themeSettings;
}

export async function getAllPages() {
    const data = await request(
        getQueryUri(),
        gql`
            query getAllPages {
                pages(first: 10) {
                    nodes {
                        slug
                    }
                }
            }
        `,
    );
    return data?.pages?.nodes;
}
