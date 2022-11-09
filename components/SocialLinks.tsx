import Link from 'next/link';

import styled from 'styled-components';
import { useThemeSettings } from '../lib/utils';
import Image from 'next/image';
import InstagramIcon from './InstagramIcon';
import { Instagram } from 'react-feather';
import GoodreadsIcon from './GoodReads';

export const StyledFontAwesome = styled(Instagram)<{ isDark: boolean }>`
    color: var(${(props) => (props.isDark ? `--color-primary` : `--white`)});
    margin-right: 1rem;
    object-fit: contain;
    background-color: transparent;
    padding: 0.75rem;
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
const SocialWrap = styled.div<{ isDark: boolean }>`
    display: flex;
    justify-content: flex-end;
    .social-link {
        color: var(
            ${(props) => (props.isDark ? `--color-primary` : `--white`)}
        );
        margin-right: 1rem;
        object-fit: contain;
        background-color: transparent;
        padding: 0.5rem 1rem;
        aspect-ratio: 1/1;
        border: ${(props) =>
            props.isDark
                ? `1px solid var(--color-primary)`
                : `1px solid var(--white)`};
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: ${(props) =>
                props.isDark ? `var(--color-primary)` : `var(--white)`};
            color: ${(props) =>
                props.isDark ? `var(--white)` : `var(--color-primary)`};
            transition: all 0.3s ease-in-out;
        }
    }
`;
export default function SocialLinks({ isDark = false }) {
    const { themeSettings } = useThemeSettings();
    const socialLinks = themeSettings?.socialLinks || {};
    if (!socialLinks) return <></>;
    const { instgram, goodReads } = socialLinks || {};
    return (
        <SocialWrap isDark={isDark}>
            {goodReads && goodReads.url && (
                <Link href={goodReads.url}>
                    <a
                        className={'social-link'}
                        title={goodReads.title || 'Good Reads'}
                        target={goodReads.target || '_self'}
                    >
                        <GoodreadsIcon color={'currentColor'} />
                    </a>
                </Link>
            )}
            {instgram && instgram.url && (
                <Link href={instgram.url}>
                    <a
                        className={'social-link'}
                        title={instgram.title || 'Instagram'}
                        target={instgram.target || '_self'}
                    >
                        <InstagramIcon color={'currentColor'} />
                    </a>
                </Link>
            )}
        </SocialWrap>
    );
}
