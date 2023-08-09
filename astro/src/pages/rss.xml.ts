import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import type { AstroUserConfig } from 'astro'

export async function get(context: AstroUserConfig) {
	const posts = await getCollection('blog');
 console.log('📦 pages/rss.xml.ts:7【posts】', posts)

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // customData: post.data.customData,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`,
		})),
		// items: await pagesGlobToRssItems(
    //   import.meta.glob('./blog/*.{md,mdx}'),
    // ),
	});
}
