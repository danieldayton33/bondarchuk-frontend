import styled from 'styled-components';
import Image from 'next/image';
import { Book } from '../generated/graphql';
import Link from 'next/link';
import { DEFAULT_FEATURED } from '../lib/constants';
import Button from './Button';
import { useRouter } from 'next/router';

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    box-shadow: var(--shadow-elevation-medium);
    background: var(--color-ternary);
    color: var(--white);
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
    &:hover {
        cursor: pointer;
        box-shadow: var(--shadow-elevation-high);
        transition: 0.5s;
        transform: scale(1.01);
    }
`;
export default function BookCard({
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
    return (
        <StyledCard onClick={handleClick}>
            {cardImage?.mediaItemUrl && (
                <Image
                    src={cardImage.mediaItemUrl}
                    alt={cardImage.altText || title || 'Book Image'}
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
