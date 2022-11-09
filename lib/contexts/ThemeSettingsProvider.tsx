import { createContext, ReactNode } from 'react';
import { ThemeSettings_Themesettings } from '../../generated/graphql';

interface AppSettingsProps {
    themeSettings?: ThemeSettings_Themesettings;
    children?: ReactNode;
}

export const ThemeSettingsContext = createContext<AppSettingsProps>({});

// @ts-ignore
export const ThemeSettingsProvider = ({ themeSettings, children }) => {
    return (
        <ThemeSettingsContext.Provider
            value={{
                themeSettings,
            }}
        >
            {children}
        </ThemeSettingsContext.Provider>
    );
};
