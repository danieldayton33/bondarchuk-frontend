import {
    Maybe,
    NodeWithFeaturedImageToMediaItemConnectionEdge,
    PostTypeSeo,
} from '../generated/graphql';
import { JSXChild } from '@typescript-eslint/types/dist/ast-spec';
import styled from 'styled-components';
import Header from './Header';
import YoastSeo from './YoastSeo';

const Wrapper = styled.div`
    max-width: 80rem;
    margin: 5rem auto;
    padding: 2rem;
`;

interface Props {
    featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
    title: String;
    children: JSXChild;
    seo: PostTypeSeo;
}

export default function Page({ featuredImage, title, seo, children }: Props) {
    return (
        <>
            {seo && <YoastSeo seo={seo} />}
            <main>
                <Header featuredImage={featuredImage} title={title} />
                <Wrapper>{children}</Wrapper>
            </main>
        </>
    );
}
