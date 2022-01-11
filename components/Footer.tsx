import Grid from './Grid';
import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';
import GridItem from './GridItem';
import SocialLinks from './SocialLinks';

export default function Footer({
    themeSettings,
    menuItems,
}: {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
}) {
    const { siteLogo, socialLinks } = themeSettings || {};
    return (
        <footer>
            <Grid columns={3} background={'var(--color-primary)'}>
                <GridItem>
                    <SocialLinks socialLinks={socialLinks} />
                </GridItem>
            </Grid>
        </footer>
    );
}
