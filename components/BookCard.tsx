import styled from 'styled-components';
import Image from 'next/image';
import { Book } from '../generated/graphql';
import Link from 'next/link';
import { DEFAULT_FEATURED } from '../lib/constants';
import Button from './Button';

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    box-shadow: var(--shadow-elevation-medium);
    background: var(--color-secondary);
    h2 {
        font-family: var(--font-highlight), cursive;
        font-size: 3rem;
        font-weight: 700;
    }
    .card-body {
        padding: 2rem;
    }
`;
export default function BookCard({
    title,
    slug,
    featuredImage,
    excerpt,
}: Book) {
    function handleClick() {
        const base = process.env.NEXT_PUBLIC_VERCEL_URL + '/books/';
        if (slug) {
            const url = new URL(slug, base);
            window.open(url.href, '_self');
        }
    }
    const cardImage = featuredImage || DEFAULT_FEATURED;
    return (
        <StyledCard onClick={handleClick}>
            {cardImage?.node?.mediaItemUrl && (
                <Image
                    src={cardImage.node.mediaItemUrl}
                    alt={cardImage.node.altText || title || 'Book Image'}
                    height={300}
                    width={300}
                    objectFit={'cover'}
                />
            )}
            <div className={'card-body'}>
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
            </div>
        </StyledCard>
    );
}
