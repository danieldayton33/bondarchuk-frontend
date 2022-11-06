import React, { createContext } from 'react';
import { ThemeSettings_Themesettings } from '../../generated/graphql';

interface AppSettingsProps {
    themeSettings?: ThemeSettings_Themesettings;
    children?: React.ReactNode;
}

export const ThemeSettingsContext = createContext<AppSettingsProps>({});

export const ThemeSettingsProvider = ({
    themeSettings = {},
    children = {},
}) => {
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
