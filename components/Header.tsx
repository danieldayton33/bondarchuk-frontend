import Image from 'next/image';
import {
    Maybe,
    NodeWithFeaturedImageToMediaItemConnectionEdge,
} from '../generated/graphql';
import styled from 'styled-components';
import { DEFAULT_FEATURED } from '../lib/constants';

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35rem;
    position: relative;
    h1 {
        z-index: 2;
        color: var(--white);
        font-size: clamp(2.5rem, 4vw + 1rem, 7.5rem);
    }
`;
interface Props {
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    title?: Maybe<String>;
}
export default function Header({ featuredImage, title }: Props) {
    const headerImage = featuredImage || DEFAULT_FEATURED;
    return (
        <StyledHeader>
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
            {title && <h1>{title}</h1>}
        </StyledHeader>
    );
}
