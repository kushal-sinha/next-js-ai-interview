/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/', // Redirect from the root path
                destination: '/dashboard', // Redirect to the dashboard
                permanent: true, // Use a 308 redirect (permanent)
            },
        ];
    },
};

export default nextConfig;
