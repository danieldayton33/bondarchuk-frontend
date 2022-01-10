import Image from 'next/image';
import Link from 'next/link';
import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';
import styled from 'styled-components';
import SocialLinks from './SocialLinks';

const StyledNav = styled.nav`
    padding: 2rem;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    width: 100%;
    z-index: 10;
    .nav-link {
        color: var(--white);
        padding: 1rem 2rem;
        font-weight: 700;
        transition: 0.25s;
        &:hover {
            color: var(--color-quaternary);
            transition: 0.25s;
        }
    }
`;

interface Props {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
}
export default function Nav({ menuItems, themeSettings }: Props) {
    const { siteLogo, socialLinks } = themeSettings || {};
    return (
        <StyledNav>
            <SocialLinks socialLinks={socialLinks} />
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
        </StyledNav>
    );
}
