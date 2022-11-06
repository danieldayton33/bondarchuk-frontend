import { FunctionComponent } from 'react';
import { Page_Pagesections_PageSections } from '../generated/graphql';
import dynamic from 'next/dynamic';

type PageSectionObject = {
    [key: string]: string;
};
const pageSectionComponents: PageSectionObject = {
    TextColumns: 'TextColumns',
    Cta: 'Cta',
    Books: 'Books',
    TextWithImage: 'TextWithImage',
};

const returnSectionType = (section: Page_Pagesections_PageSections) => {
    const title = section?.__typename;
    if (title) {
        const filteredTitle = title.replace(
            'Page_Pagesections_PageSections_',
            '',
        );
        return pageSectionComponents
            ? pageSectionComponents[filteredTitle]
            : undefined;
    }
    return null;
};

type Props = {
    pageSections: [Page_Pagesections_PageSections];
};

const PageSectionLoader: FunctionComponent<Props> = function ({
    pageSections,
}) {
    if (!(pageSections.length > 0)) return <></>;
    return (
        <div>
            {pageSections &&
                pageSections.map((pageSection, i) => {
                    const elementName = returnSectionType(pageSection);
                    if (!elementName) return;
                    const PSComponent = dynamic(
                        () =>
                            import(`../components/PageSections/${elementName}`),
                    );
                    return (
                        <PSComponent
                            key={`page-section-${i}`}
                            {...pageSection}
                        />
                    );
                })}
        </div>
    );
};

export default PageSectionLoader;
