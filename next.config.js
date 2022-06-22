/** @type {import('next').NextConfig} */
module.exports = {
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: [
            'ddheadlesstheme.local',
            'jillian-bondarchuk.flywheelsites.com',
            'bondarchuk-admin.local',
        ],
    },
    reactStrictMode: true,
};
