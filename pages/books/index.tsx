import { getAllBooks, getMenu, getThemeSettings } from '../../lib/queries';
import { useQuery } from 'react-query';
import {
    Book,
    MenuItem,
    ThemeSettings_Themesettings,
} from '../../generated/graphql';
import BookCard from '../../components/BookCard';
import styled from 'styled-components';
import Page from '../../components/Page';
import Grid from '../../components/Grid';
import Container from '../../components/Container';
import { FlexGridItem } from '../../components/PageSections/Books';

const BookWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    max-width: 1200px;
    margin: 5rem auto;
`;

interface Props {
    books: Array<Book>;
    menuItems: Array<MenuItem>;
    themeSettings: ThemeSettings_Themesettings;
}
export default function Books({ books, menuItems, themeSettings }: Props) {
    const { data } = useQuery('all-books', () => getAllBooks({ first: 10 }), {
        initialData: books,
        notifyOnChangeProps: 'tracked',
    });
    return (
        <Page
            title={'Books'}
            seo={null}
            menuItems={menuItems}
            themeSettings={themeSettings}
        >
            <Container maxWidth={'xxl'}>
                <Grid columns={2}>
                    {data &&
                        data.map((book: Book, i: number) => (
                            <FlexGridItem key={`book-${i}`}>
                                <BookCard {...book} />
                            </FlexGridItem>
                        ))}
                </Grid>
            </Container>
        </Page>
    );
}

export async function getStaticProps() {
    const books = await getAllBooks({ first: 10 });
    const menuItems = await getMenu();
    const themeSettings = await getThemeSettings();
    return {
        props: {
            themeSettings,
            books,
            menuItems: menuItems,
        },
        revalidate: 300,
    };
}
