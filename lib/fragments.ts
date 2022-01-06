import { gql } from 'graphql-request';

export const HEADERFIELDS = gql``;

export const BOOKS_FIELDS = `
        booksFields {
            amazonLink {
                target
                title
                url
            }
            completionDate
            goodReadsLink {
                target
                title
                url
            }
            isComplete
            progress {
                completePages
                totalPages
            }
            coverImage {
                mediaItemUrl
                altText
            }
        }
        content
        excerpt
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
`;
