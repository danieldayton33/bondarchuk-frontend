import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Page_Pagesections_PageSections_TextColumns } from '../../generated/graphql';
import Grid from '../Grid';
import { StyledPreTitle, StyledSectionTitle } from '../styled';
import GridItem from '../GridItem';
import Button from '../Button';
import Container from '../Container';

const TextColumns: FunctionComponent<Page_Pagesections_PageSections_TextColumns> =
    function ({ columns, title, preTitle }) {
        const containerWidth =
            columns?.length && columns.length > 1 ? 'xxl' : 'md';
        return (
            <Grid columns={columns?.length || 1}>
                {
                    <GridItem span={columns?.length || 1}>
                        <>
                            {preTitle && (
                                <StyledPreTitle>{preTitle}</StyledPreTitle>
                            )}
                            {title && (
                                <StyledSectionTitle>{title}</StyledSectionTitle>
                            )}
                        </>
                    </GridItem>
                }
                <Container maxWidth={containerWidth} padding={'0'}>
                    {columns?.length &&
                        columns.map((col, i) => {
                            return (
                                <GridItem
                                    key={`${JSON.stringify(col)}-${i}`}
                                    padding={0}
                                >
                                    {col?.content && (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: col.content,
                                            }}
                                        />
                                    )}
                                    {col?.columnLink && (
                                        <div className={'text-center'}>
                                            <Link
                                                href={col.columnLink.url || '/'}
                                            >
                                                <a
                                                    title={
                                                        col.columnLink.title ||
                                                        ''
                                                    }
                                                    target={
                                                        col.columnLink.target ||
                                                        '_self'
                                                    }
                                                >
                                                    <Button>
                                                        {col.columnLink.title ||
                                                            'Learn More'}
                                                    </Button>
                                                </a>
                                            </Link>
                                        </div>
                                    )}
                                </GridItem>
                            );
                        })}
                </Container>
            </Grid>
        );
    };

export default TextColumns;
