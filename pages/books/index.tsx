import { getAllBooks } from '../../lib/queries';
import { useQuery } from 'react-query';
import { Book } from '../../generated/graphql';
import BookCard from '../../components/BookCard';
import styled from 'styled-components';

const BookWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    max-width: 1200px;
    margin: 5rem auto;
`;
interface Props {
    books: Array<Book>;
}
export default function Books({ books }: Props) {
    const { data } = useQuery('all-books', () => getAllBooks({ first: 10 }), {
        initialData: books,
        notifyOnChangeProps: 'tracked',
    });

    return (
        <BookWrap>
            {data.length &&
                data.map((book: Book, i: number) => (
                    <BookCard key={`book-${i}`} {...book} />
                ))}
        </BookWrap>
    );
}

export async function getStaticProps() {
    const books = await getAllBooks({ first: 10 });
    return {
        props: {
            books,
        },
        revalidate: 300,
    };
}
