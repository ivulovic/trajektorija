import Categories from './categories';
import * as Articles from './html';

const websiteUrl = "https://trajektorija.com";

const posts = [
  {
    title: 'Свелт и његова реактивност',
    description: `О потезима које је Свелт повукао да би постао реактиван`,
    html: Articles.svelteINjegovaReaktivnost,
    slug: 'svelte-i-njegova-reaktivnost',
    categories: [Categories.REAKTIVNOST, Categories.SVELTE],
    date: 1620341319309,
  },
  {
    title: 'Испитивање реактивности у Риекту',
    description: `О реактивности и како се Риект носи с тим`,
    html: Articles.ispitivanjeReaktivnostiUReactu,
    slug: 'ispitivanje-reaktivnosti-u-reactu',
    categories: [Categories.REAKTIVNOST, Categories.REACT],
    date: 1620071150231,
  },
  {
    title: 'Приватност',
    description: `О непостојећој интернет приватности`,
    html: Articles.privatnost,
    slug: 'privatnost',
    categories: [Categories.PRIVATNOST],
    date: 1619039210087,
  },
  {
    title: 'Гитхаб акције и рударење криптовалута',
    description: `О скорашњим догађајима и злоупотреби Гитхаб акција`,
    html: Articles.githubAkcijeIRudarenjeKriptovaluta,
    slug: 'github-akcije-i-rudarenje-kriptovaluta',
    categories: [Categories.GITHUB, Categories.KRIPTOVALUTE, Categories.BEZBEDNOST],
    date: 1618263265064,
  },
  {
    title: 'Настанак Трајекторије',
    description: `О самом пројекту, одабраном имену и потреби за писањем`,
    html: Articles.nastanakTrajektorije,
    slug: 'nastanak-trajektorije',
    categories: [Categories.TRAJEKTORIJA],
    date: 1617742975109,
  },
];

posts.forEach(post => {
  post.html = post.html.replace(/^\t{3}/gm, '');
  post.metadata = {
    title: post.title,
    description: post.description,
    keywords: post.categories.map(x => x.label).join(", "),
    url: `${websiteUrl}/${post.slug}`,
    thumb: `${websiteUrl}/images/posts/${post.slug}.png`,
    thumbAlt: `Логотип сајта Трајекторија`,
  }
});

export default posts;
