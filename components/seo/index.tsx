import { NextSeo } from 'next-seo';

const SEO = () => (
	<>
		<NextSeo
			title='spaces3'
			description='The ultimate audio conferencing solution with token gating, customizable profiles, and real-time collaboration features.'
			openGraph={{
				url: 'https://spaces3.vercel.app',
				title: 'spaces3 - Elevate your virtual meetings!',
				description:
					'The ultimate audio conferencing solution with token gating, customizable profiles, and real-time collaboration features.',
				images: [
					{
						url: 'hhttps://i.ibb.co/zs7rmJG/og.png',
						width: 1200,
						height: 630,
						alt: 'spaces3 Open Graph Image',
						type: 'image/png',
					},
				],
				siteName: 'spaces3',
			}}
			twitter={{
				handle: '@Envoy_1084',
				cardType: 'summary_large_image',
			}}
		/>
	</>
);

export default SEO;
