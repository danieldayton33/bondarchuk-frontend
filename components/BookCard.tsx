import styled from 'styled-components';
import Image from 'next/image';
import { Book } from '../generated/graphql';
import Link from 'next/link';

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 7px;
    background: linear-gradient(45deg, #cacaca, #f0f0f0);
    box-shadow: 29px -29px 58px #cecece, -29px 29px 58px #f2f2f2;
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
    return (
        <StyledCard>
            {featuredImage?.node?.mediaItemUrl && (
                <Image
                    src={featuredImage.node.mediaItemUrl}
                    alt={featuredImage.node.altText || title || 'Book Image'}
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
                        <a title={`Read More about ${title}`}>Read More</a>
                    </Link>
                }
            </div>
        </StyledCard>
    );
}