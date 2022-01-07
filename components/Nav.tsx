import { MenuItem, ThemeSettings_Themesettings } from '../generated/graphql';

interface Props {
    themeSettings?: ThemeSettings_Themesettings;
    menuItems?: Array<MenuItem>;
}
export default function Nav({ menuItems, themeSettings }: Props) {
    console.log(menuItems);
    console.log(themeSettings);
    const { siteLogo, socialLinks } = themeSettings || {};
    return (
        <nav>
            {}
            <h1>Home</h1>
        </nav>
    );
}
