import Image from 'next/image';
import Link from 'next/link';
import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoodreads } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

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
const StyledFontAwesome = styled(FontAwesomeIcon)`
    color: var(--white);
    margin-right: 1rem;
    &:hover {
        color: var(--color-secondary);
    }
`;
interface Props {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
}
export default function Nav({ menuItems, themeSettings }: Props) {
    const { siteLogo, socialLinks } = themeSettings || {};
    const { instgram, goodReads } = socialLinks || {};
    return (
        <StyledNav>
            <div>
                {goodReads && goodReads.url && (
                    <Link href={goodReads.url}>
                        <a
                            title={goodReads.title || 'Good Reads'}
                            target={goodReads.target || '_self'}
                        >
                            <StyledFontAwesome icon={faGoodreads} />
                        </a>
                    </Link>
                )}
                {instgram && instgram.url && (
                    <Link href={instgram.url}>
                        <a
                            title={instgram.title || 'Instagram'}
                            target={instgram.target || '_self'}
                        >
                            <StyledFontAwesome icon={faInstagram} />
                        </a>
                    </Link>
                )}
            </div>
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
