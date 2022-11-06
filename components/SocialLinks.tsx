import Link from 'next/link';
import {
    faGoodreads,
    faGoodreadsG,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useThemeSettings } from '../lib/utils';

const StyledFontAwesome = styled(FontAwesomeIcon)<{ isDark: boolean }>`
    color: var(${(props) => (props.isDark ? `--color-primary` : `--white`)});
    margin-right: 1rem;

    background-color: transparent;
    padding: 1rem;
    aspect-ratio: 1/1;
    border: ${(props) =>
        props.isDark
            ? `1px solid var(--color-primary)`
            : `1px solid var(--white)`};
    border-radius: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${(props) =>
            props.isDark ? `var(--color-primary)` : `var(--white)`};
        color: ${(props) =>
            props.isDark ? `var(--white)` : `var(--color-primary)`};
        transition: all 0.3s ease-in-out;
    }
`;
const SocialWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;
export default function SocialLinks({ isDark = false }) {
    const { themeSettings } = useThemeSettings();
    const socialLinks = themeSettings?.socialLinks || {};
    if (!socialLinks) return <></>;
    const { instgram, goodReads } = socialLinks || {};
    return (
        <SocialWrap>
            {goodReads && goodReads.url && (
                <Link href={goodReads.url}>
                    <a
                        title={goodReads.title || 'Good Reads'}
                        target={goodReads.target || '_self'}
                    >
                        <StyledFontAwesome
                            isDark={isDark}
                            size="1x"
                            icon={faGoodreadsG}
                        />
                    </a>
                </Link>
            )}
            {instgram && instgram.url && (
                <Link href={instgram.url}>
                    <a
                        title={instgram.title || 'Instagram'}
                        target={instgram.target || '_self'}
                    >
                        <StyledFontAwesome
                            isDark={isDark}
                            size="1x"
                            icon={faInstagram}
                        />
                    </a>
                </Link>
            )}
        </SocialWrap>
    );
}
