import NProgress from 'nprogress';
import Router from 'next/router';
import '../styles/globals.css';
import '../styles/nprogress.css';
import '@wordpress/block-library/build-style/common.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';
import type { AppProps } from 'next/app';
import Theme from '../components/Theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeSettingsProvider } from '../lib/contexts/ThemeSettingsProvider';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    const { themeSettings } = pageProps;
    return (
        <Theme>
            <ThemeSettingsProvider themeSettings={themeSettings}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ThemeSettingsProvider>
        </Theme>
    );
}

export default MyApp;
