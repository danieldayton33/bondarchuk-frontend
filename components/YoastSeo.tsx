import { PostTypeSeo } from '../generated/graphql';
import Head from 'next/head';
import parse from 'html-react-parser';

export default function YoastSeo({ seo }: { seo: PostTypeSeo }) {
    const { title: seoTitle, fullHead, metaDesc } = seo;
    const parsedHead = fullHead ? parse(fullHead) : null;

    return (
        <>
            {seoTitle && fullHead && (
                <Head>
                    <title>
                        {seoTitle || process.env.NEXT_PUBLIC_CMS_NAME}
                    </title>
                    <meta
                        name="description"
                        content={metaDesc || process.env.NEXT_PUBLIC_CMS_NAME}
                    />
                    {parsedHead && parsedHead}
                </Head>
            )}
        </>
    );
}
