/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl:
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        'https://https://bondarchuk-frontend.vercel.app',
    generateRobotsTxt: true, // (optional)
    // ...other options
};
