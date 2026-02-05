import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Curzon House | Private Members Club',
        short_name: 'Curzon House',
        description: 'An invitation-only members club in Mayfair.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f0d0a',
        theme_color: '#0f0d0a',
        icons: [
            {
                src: '/favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
    }
}
