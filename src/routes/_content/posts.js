import Categories from './categories';
import * as Articles from './html';

const websiteUrl = "https://trajektorija.com";

const posts = [
  {
    title: 'Гитхаб акције и рударење криптовалута',
    description: `О скорашњим догађајима и злоупотреби Гитхаб акција`,
    html: Articles.githubAkcijeIRudarenjeKriptovaluta,
    image: 'images/octohacker.png',
    slug: 'github-akcije-i-rudarenje-kriptovaluta',
    categories: [Categories.GITHUB, Categories.KRIPTOVALUTE, Categories.BEZBEDNOST],
    date: 1618263265064,
  },
  {
    title: 'Настанак Трајекторије',
    description: `О самом пројекту, одабраном имену и потреби за писањем`,
    html: Articles.nastanakTrajektorije,
    image: 'images/t.png',
    slug: 'nastanak-trajektorije',
    categories: [Categories.TRAJEKTORIJA],
    date: 1617742975109,
    metadata: {
      thumb: `${websiteUrl}/logo_large.png`,
    }
  },
];

//


posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, '');
  post.metadata = {
    title: post.title,
    description: post.description,
    keywords: post.categories.map(x => x.label).join(", "),
    url: `${websiteUrl}/${post.slug}`,
    thumb: `${websiteUrl}/${post.image}`,
    thumbAlt: `Слика чланка`,
    ...(post.metadata || {}),
  }
});

export default posts;
