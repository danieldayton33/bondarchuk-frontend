import { gql, request } from 'graphql-request';
import { getQueryUri } from './utils';
import { BOOKS_FIELDS, MENU_QUERY, THEME_SETTINGS } from './fragments';

export async function getHomePage() {
    return await request(
        getQueryUri(),
        gql`
            query HomePageQuery {
                nodeByUri(uri: "/") {
                    __typename
                    ... on ContentType {
                        id
                        name
                    }
                    ... on Page {
                        id
                        title
                    }
                }
            }
        `,
    );
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
                        ${BOOKS_FIELDS}
                    }
                }
            }
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
                    ${BOOKS_FIELDS}
                }
            }
        `,
        { id: slug },
    );
    return data?.book;
}

export async function getThemeSettings() {
    const data = await request(getQueryUri(), THEME_SETTINGS);
    return data?.themeSettings?.themeSettings;
}
