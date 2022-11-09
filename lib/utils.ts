import { Ref, useContext, useEffect, useState } from 'react';
import { ThemeSettingsContext } from './contexts/ThemeSettingsProvider';

export function getQueryUri(): string {
    return process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
}

// Reusable hover hook
export function useHover(ref: { current: any }): boolean {
    const [value, setValue] = useState<boolean>(false);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(() => {
        const node = ref?.current;
        if (node) {
            node.addEventListener('mouseover', handleMouseOver);
            node.addEventListener('mouseout', handleMouseOut);
            return () => {
                node.removeEventListener('mouseover', handleMouseOver);
                node.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [ref]);
    return value;
}

export const useThemeSettings = () => useContext(ThemeSettingsContext);
