import { gql, request } from 'graphql-request';
import { getQueryUri } from './utils';

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
export async function getAllBooks({ first = 10 }) {
    const data = await request(
        getQueryUri(),
        gql`
            query getAllBooks($first: Int) {
                books(first: $first) {
                    nodes {
                        title
                        slug
                        featuredImage {
                            node {
                                altText
                                mediaItemUrl
                            }
                        }
                        excerpt
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
    console.log(slug);
    const data = await request(
        getQueryUri(),
        gql`
            query getBookBySlug($id: ID!) {
                book(id: $id, idType: SLUG) {
                    title
                    seo {
                        fullHead
                        metaDesc
                        title
                    }
                    featuredImage {
                        node {
                            altText
                            mediaItemUrl
                        }
                    }
                    date
                    content
                    slug
                }
            }
        `,
        { id: slug },
    );
    return data?.book;
}
