import { gql } from 'graphql-request';

export const THEME_SETTINGS = gql`
    query themeSettings {
        themeSettings {
            themeSettings {
                siteLogo {
                    altText
                    mediaItemUrl
                }
                socialLinks {
                    goodReads {
                        target
                        title
                        url
                    }
                    instgram {
                        target
                        title
                        url
                    }
                }
            }
        }
    }
`;

export const MENU_QUERY = gql`
    query MenuQuery {
        menu(id: "Primary", idType: NAME) {
            id
            menuItems {
                nodes {
                    label
                    target
                    path
                    childItems {
                        nodes {
                            childItems {
                                nodes {
                                    path
                                    label
                                    target
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
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

export const PageSectionFragment = gql`
    fragment PageSectionFragment on Page {
        PageSections {
            pageSections {
                __typename
                ... on Page_Pagesections_PageSections_TextColumns {
                    columns {
                        content
                        columnLink {
                            url
                            title
                            target
                        }
                    }
                    title
                    preTitle
                }
                ... on Page_Pagesections_PageSections_Cta {
                    content
                    link {
                        url
                        title
                        target
                    }
                    columnImage {
                        altText
                        mediaItemUrl
                    }
                    backgroundImage {
                        altText
                        mediaItemUrl
                    }
                }
                ... on Page_Pagesections_PageSections_Books {
                    books {
                        ... on Book {
                            title
                            uri
                            slug
                            excerpt
                            featuredImage {
                                node {
                                    mediaItemUrl
                                    altText
                                }
                            }
                            booksFields {
                                completionDate
                                coverImage {
                                    mediaItemUrl
                                    altText
                                }
                                progress {
                                    totalPages
                                    completePages
                                }
                            }
                        }
                    }
                    displayAsFutureReleases
                }
                ... on Page_Pagesections_PageSections_TextWithImage {
                    content
                    addSocialLinks
                    image {
                        altText
                        mediaItemUrl
                    }
                    title
                    preTitle
                }
            }
        }
    }
`;
