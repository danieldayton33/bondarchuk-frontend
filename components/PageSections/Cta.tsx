import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Page_Pagesections_PageSections_Cta } from '../../generated/graphql';
import Container from '../Container';
import Grid from '../Grid';
import GridItem from '../GridItem';
import styled from 'styled-components';
import Button from '../Button';

const StyledContent = styled(GridItem)<{ dark: boolean }>`
    color: ${(props) => (props.dark ? 'var(--white)' : 'var(--theme-primary)')};
`;

const Cta: FunctionComponent<Page_Pagesections_PageSections_Cta> = function ({
    content,
    columnImage,
    backgroundImage,
    link,
}) {
    return (
        <Container maxWidth={'xxl'}>
            <Grid>
                {columnImage?.mediaItemUrl && (
                    <GridItem>
                        <Image
                            layout={'fill'}
                            src={columnImage?.mediaItemUrl}
                            alt={columnImage?.altText || ''}
                            objectFit={'cover'}
                        />
                    </GridItem>
                )}
                {content && (
                    <StyledContent dark={!!backgroundImage} padding={10}>
                        {backgroundImage?.mediaItemUrl && (
                            <Image
                                src={backgroundImage.mediaItemUrl}
                                layout={'fill'}
                                alt={''}
                                objectFit={'cover'}
                                className={'bg-image'}
                            />
                        )}
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                        {link && (
                            <Link href={link.url || '/'}>
                                <a
                                    title={link.title || 'Learn More'}
                                    target={link.target || '_self'}
                                >
                                    <Button
                                        theme={
                                            backgroundImage ? 'light' : 'dark'
                                        }
                                    >
                                        {link.title}
                                    </Button>
                                </a>
                            </Link>
                        )}
                    </StyledContent>
                )}
            </Grid>
        </Container>
    );
};

export default Cta;
