import styled from 'styled-components';
import Image from 'next/image';
import { Book } from '../generated/graphql';
import Link from 'next/link';
import { DEFAULT_FEATURED } from '../lib/constants';
import Button from './Button';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useHover } from '../lib/utils';
import { animated, useSpring } from '@react-spring/web';

const StyledCard = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    box-shadow: var(--shadow-elevation-medium);

    color: var(--white);
    transition: 0.5s;
    width: fit-content;
    h2 {
        font-family: var(--font-highlight), cursive;
        text-transform: uppercase;
        font-size: 3rem;
        font-weight: 700;
        line-height: 4rem;
    }
    &:hover {
        cursor: pointer;
        transition: 0.5s;
        transform: scale(1.01);
    }
`;
const CardBody = styled.div`
    padding: 2rem 3rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(var(--color-primary--hex), 0.85);
    left: 0;
    top: 0;
`;

const AnimatedCardBody = animated(CardBody);
export default function BookCard({
    title,
    slug,
    featuredImage,
    excerpt,
    booksFields,
}: Book) {
    const router = useRouter();
    const ref = useRef(null);
    const isHovered = useHover(ref);
    const styles = useSpring({
        to: {
            opacity: isHovered ? 1 : 0,
            paddingTop: isHovered ? 0 : 200,
        },
    });
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
    return (
        <StyledCard onClick={handleClick} ref={ref}>
            {cardImage?.mediaItemUrl && (
                <Image
                    src={cardImage.mediaItemUrl}
                    alt={cardImage.altText || title || 'Book Image'}
                    height={600}
                    width={400}
                    objectFit={'contain'}
                />
            )}
            <AnimatedCardBody style={styles}>
                {title && <h2>{title}</h2>}
                {excerpt && (
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                )}
                {
                    <Link href={`/books/${slug}`}>
                        <a title={`Read More about ${title}`}>
                            <Button theme={'light'}>Read More</Button>
                        </a>
                    </Link>
                }
            </AnimatedCardBody>
        </StyledCard>
    );
}
