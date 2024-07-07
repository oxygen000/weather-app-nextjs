/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'export',
    reactStrictMode: true,
    images:{
        unoptimized: true,
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'openweathermap.org',
                port:'',
                pathname:'/img/wn/**'
            }
            

        ]
    }
};

export default nextConfig;
