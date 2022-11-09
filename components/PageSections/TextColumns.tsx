import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Page_Pagesections_PageSections_TextColumns } from '../../generated/graphql';
import Grid from '../Grid';
import { StyledPreTitle, StyledSectionTitle } from '../styled';
import GridItem from '../GridItem';
import Button from '../Button';
import Container from '../Container';
import styled from 'styled-components';
import classNames from 'classnames';

const StyledGridItem = styled(GridItem)`
    &.is-single {
        margin: 0 auto;
        max-width: ${(props) => props.theme.breakpoints.sm};
    }
`;

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
                                <StyledSectionTitle center={true}>
                                    {title}
                                </StyledSectionTitle>
                            )}
                        </>
                    </GridItem>
                }
                <Container maxWidth={containerWidth} padding={'0'}>
                    {columns?.length &&
                        columns.map((col, i) => {
                            const isSingleColumn = columns.length === 1;
                            return (
                                <StyledGridItem
                                    className={classNames({
                                        'is-single': isSingleColumn,
                                    })}
                                    key={`${JSON.stringify(col)}-${i}`}
                                    padding={2}
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
                                </StyledGridItem>
                            );
                        })}
                </Container>
            </Grid>
        );
    };

export default TextColumns;
