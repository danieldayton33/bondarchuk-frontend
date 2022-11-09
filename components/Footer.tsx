import Grid from './Grid';
import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';
import GridItem from './GridItem';
import SocialLinks from './SocialLinks';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Container from './Container';

const StyledFooter = styled.footer`
    background: var(--color-primary);
`;
const LinkWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    ul {
        list-style-type: none;
        display: flex;
        li {
            &:not(:last-of-type) {
                margin-right: clamp(2rem, 4vw, 5rem);
            }
        }
    }
    a {
        color: var(--white);
        font-weight: 700;
        transition: 0.25s;
        font-family: var(--font-highlight), cursive;
        letter-spacing: 0.15rem;
        &:hover {
            color: var(--color-secondary);
        }
    }
`;

const StyledGridItem = styled(GridItem)`
    display: flex;
    align-self: center;
    justify-content: flex-end;
`;
export default function Footer({
    themeSettings,
    menuItems,
}: {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
}) {
    const { siteLogo } = themeSettings || {};
    return (
        <StyledFooter>
            <Container maxWidth={'xxl'}>
                <Grid columns={3} background={'var(--color-primary)'}>
                    <GridItem>
                        <Link href={'/'}>
                            <a title={'Home'} style={{ textAlign: 'center' }}>
                                {siteLogo && siteLogo?.mediaItemUrl ? (
                                    <Image
                                        src={siteLogo.mediaItemUrl}
                                        alt={siteLogo.altText || 'Jillian Site'}
                                        height={80}
                                        width={200}
                                        objectFit={'contain'}
                                    />
                                ) : (
                                    'Home'
                                )}
                            </a>
                        </Link>
                    </GridItem>
                    <LinkWrap>
                        {menuItems && (
                            <ul>
                                {menuItems.map((link, i) => {
                                    return (
                                        <li key={`link-${i}`}>
                                            <Link
                                                href={link.path || '/'}
                                                key={`menu-item${i}`}
                                            >
                                                <a
                                                    className={'nav-link'}
                                                    target={
                                                        link.target || '_self'
                                                    }
                                                    title={link.title || ''}
                                                >
                                                    {link.label}
                                                </a>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </LinkWrap>
                    <StyledGridItem>
                        <SocialLinks />
                    </StyledGridItem>
                </Grid>
            </Container>
        </StyledFooter>
    );
}
