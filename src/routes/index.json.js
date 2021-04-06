import posts from './_content/posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		image: post.image,
		description: post.description,
		slug: post.slug,
		categories: post.categories,
		metadata: post.metadata,
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
}