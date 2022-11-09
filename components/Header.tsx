import Image from 'next/image';
import {
    Maybe,
    NodeWithFeaturedImageToMediaItemConnectionEdge,
    ThemeSettings_Themesettings,
} from '../generated/graphql';
import styled from 'styled-components';
import { DEFAULT_FEATURED } from '../lib/constants';
import classNames from 'classnames';

const StyledHeader = styled.header<{ isFrontPage?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: auto;
    position: relative;
    min-height: 40rem;
    h1 {
        z-index: 2;
        text-transform: uppercase;
        letter-spacing: 0.75rem;
        color: var(--white);
        font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
        font-family: var(--font-highlight);
        text-align: center;
        line-height: 5rem;
        padding: 5rem 0;
        &.header-title {
            &__home {
                margin-top: 0;
                font-family: var(--font-body);
                font-size: 2.5rem;
                font-weight: 400;
                letter-spacing: 0;
                line-height: 2.5rem;
                padding: 0 2rem 5rem;
            }
        }
    }
    .home-logo {
        margin-top: 10rem;
        width: 60%;
        min-height: 30rem;
    }
`;
const StyledPreTitle = styled.h2`
    position: absolute;
    bottom: 10rem;
    font-family: var(--font-cursive);
    font-size: clamp(6rem, 4vw + 1rem, 8rem);
    color: var(--white);
    opacity: 0.2;
`;
interface Props {
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    title?: Maybe<String>;
    cursiveTitle?: Maybe<String>;
    isFrontPage?: boolean;
    themeSettings?: ThemeSettings_Themesettings;
    preTitle?: Maybe<String> | undefined;
}
export default function Header({
    featuredImage,
    title,
    cursiveTitle,
    isFrontPage,
    themeSettings,
}: Props) {
    const headerImage = DEFAULT_FEATURED;
    return (
        <StyledHeader isFrontPage={isFrontPage}>
            {headerImage && headerImage.node?.mediaItemUrl && (
                <Image
                    src={headerImage.node?.mediaItemUrl}
                    layout={'fill'}
                    alt={
                        headerImage.node.altText || `Header Image for ${title}`
                    }
                    objectFit={'cover'}
                />
            )}
            {!isFrontPage && cursiveTitle && (
                <StyledPreTitle>{cursiveTitle}</StyledPreTitle>
            )}
            {isFrontPage && themeSettings?.siteLogo?.mediaItemUrl && (
                <div className={'home-logo'}>
                    <Image
                        src={themeSettings.siteLogo.mediaItemUrl}
                        height={300}
                        width={800}
                        objectFit={'contain'}
                        alt={'Jillian Bondearchuk'}
                        className={'home-logo__image'}
                        layout={'responsive'}
                    />
                </div>
            )}
            {title && (
                <h1
                    className={classNames({
                        'header-title': true,
                        'header-title__home': isFrontPage,
                    })}
                >
                    {title}
                </h1>
            )}
        </StyledHeader>
    );
}
