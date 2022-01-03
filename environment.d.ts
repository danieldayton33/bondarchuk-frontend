declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_WORDPRESS_API_URL: string;
            NEXT_PUBLIC_VERCEL_URL: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
