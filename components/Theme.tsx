import { DefaultTheme, ThemeProvider } from 'styled-components';

const theme: DefaultTheme = {
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1400px',
    },
};

export default function Theme({ children }: { children: JSX.Element }) {
    return <ThemeProvider theme={theme}>{children} </ThemeProvider>;
}
