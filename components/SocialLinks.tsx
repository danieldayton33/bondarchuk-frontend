import Link from 'next/link';
import { faGoodreads, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Maybe,
    ThemeSettings_Themesettings_SocialLinks,
} from '../generated/graphql';

const StyledFontAwesome = styled(FontAwesomeIcon)`
    color: var(--white);
    margin-right: 1rem;
    &:hover {
        color: var(--color-secondary);
    }
`;
export default function SocialLinks({
    socialLinks,
}: {
    socialLinks?: Maybe<ThemeSettings_Themesettings_SocialLinks>;
}) {
    const { instgram, goodReads } = socialLinks || {};
    return (
        <div>
            {goodReads && goodReads.url && (
                <Link href={goodReads.url}>
                    <a
                        title={goodReads.title || 'Good Reads'}
                        target={goodReads.target || '_self'}
                    >
                        <StyledFontAwesome icon={faGoodreads} />
                    </a>
                </Link>
            )}
            {instgram && instgram.url && (
                <Link href={instgram.url}>
                    <a
                        title={instgram.title || 'Instagram'}
                        target={instgram.target || '_self'}
                    >
                        <StyledFontAwesome icon={faInstagram} />
                    </a>
                </Link>
            )}
        </div>
    );
}
