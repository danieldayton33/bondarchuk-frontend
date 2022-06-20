import Image from 'next/image';
import Link from 'next/link';
import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';
import styled from 'styled-components';
import SocialLinks from './SocialLinks';
import classNames from 'classnames';

const StyledNav = styled.nav`
    padding: 4rem 0;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    width: 100%;
    z-index: 10;
    max-width: ${(props) => props.theme.breakpoints.xxl};
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    .nav-link {
        color: var(--white);
        padding: 1rem 2rem;
        font-weight: 700;
        transition: 0.25s;
        font-family: var(--font-highlight), cursive;
        letter-spacing: 0.15rem;
        &:hover {
            color: var(--color-ternary-100);
            transition: 0.25s;
        }
    }
    .logo-link {
        &__home {
            display: none !important;
        }
    }
`;

interface Props {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
    isFrontPage?: boolean;
}
export default function Nav({
    menuItems,
    themeSettings,
    isFrontPage = false,
}: Props) {
    const { siteLogo, socialLinks } = themeSettings || {};
    return (
        <StyledNav>
            {menuItems && (
                <div>
                    {menuItems.map((link, i) => {
                        return (
                            <Link href={link.path || '/'} key={`menu-item${i}`}>
                                <a
                                    className={'nav-link'}
                                    target={link.target || '_self'}
                                    title={link.title || ''}
                                >
                                    {link.label}
                                </a>
                            </Link>
                        );
                    })}
                </div>
            )}

            <Link href={'/'}>
                <a title={'Home'} style={{ textAlign: 'center' }}>
                    {siteLogo && siteLogo?.mediaItemUrl ? (
                        <Image
                            src={siteLogo.mediaItemUrl}
                            alt={siteLogo.altText || 'Jillian Site'}
                            height={80}
                            width={200}
                            objectFit={'contain'}
                            className={classNames({
                                'logo-link': true,
                                'logo-link__home': isFrontPage,
                            })}
                        />
                    ) : (
                        'Home'
                    )}
                </a>
            </Link>
            <SocialLinks socialLinks={socialLinks} />
        </StyledNav>
    );
}
