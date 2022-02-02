import { Book } from '../generated/graphql';
import { DEFAULT_FEATURED } from '../lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import styled from 'styled-components';
import { animated, useSpring } from '@react-spring/web';
import { useRef } from 'react';
import { useHover } from '../lib/utils';
import { useRouter } from 'next/router';

const FlipDiv = styled.div`
    position: absolute;
    height: 40rem;
    width: 25rem;
    cursor: pointer;
    will-change: transform, opacity;
    box-shadow: var(--shadow-elevation-medium);
`;
const FlipWrap = styled.div`
    position: relative;
    height: 40rem;
`;
const StyledCard = styled.div`
    padding: 4rem 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    background-image: url('/images/paper.png');
    background-size: cover;

    transition: 0.5s;
    h2 {
        font-family: var(--font-highlight), cursive;
        font-size: 3rem;
        font-weight: 700;
        line-height: 4rem;
    }
    .card-body {
        padding: 2rem;
    }
`;
const AnimatedFlipDiv = animated(FlipDiv);

export default function BookFlipCard({
    title,
    slug,
    featuredImage,
    excerpt,
    booksFields,
}: Book) {
    const router = useRouter();
    function handleClick() {
        const base = process.env.NEXT_PUBLIC_VERCEL_URL + '/books/';
        if (slug) {
            const url = new URL(slug, base);
            router.push(url.href);
        }
    }
    const cardImage =
        booksFields?.coverImage ||
        featuredImage?.node ||
        DEFAULT_FEATURED?.node;
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const { transform, opacity } = useSpring({
        opacity: isHovered ? 1 : 0,
        transform: `perspective(600px) rotateY(${isHovered ? 180 : 0}deg)`,
        config: { mass: 5, tension: 275, friction: 80 },
    });
    return (
        <FlipWrap ref={ref} onClick={handleClick}>
            {cardImage?.mediaItemUrl && (
                <AnimatedFlipDiv
                    style={{ opacity: opacity.to((o) => 1 - o), transform }}
                >
                    <Image
                        src={cardImage.mediaItemUrl}
                        alt={cardImage.altText || title || 'Book Image'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </AnimatedFlipDiv>
            )}
            <AnimatedFlipDiv
                style={{
                    opacity,
                    transform,
                    rotateY: '180deg',
                }}
            >
                <StyledCard>
                    {title && <h2>{title}</h2>}
                    {excerpt && (
                        <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                    )}
                    {
                        <Link href={`/books/${slug}`}>
                            <a title={`Read More about ${title}`}>
                                <Button>Read More</Button>
                            </a>
                        </Link>
                    }
                </StyledCard>
            </AnimatedFlipDiv>
        </FlipWrap>
    );
}
