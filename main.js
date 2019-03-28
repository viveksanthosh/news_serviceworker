const apiKey = 'ee6e8f12642745248590ff138c7b1134',
    defaultSource = 'bbc-news';

const OptionsDom = document.getElementById('sources');
const BodyDom = document.getElementById('body');
const getSources = () => fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`)
    .then(r => r.json())
    .then(({ sources }) => sources);

const getNews = source => fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`)
    .then(r => r.json())
    .then(({ articles }) => articles);


const main = async () => {
    let sources = await getSources();
    refreshNews();
    OptionsDom.innerHTML = sources.map(convertSourceToOption).join('\n');
    OptionsDom.value = defaultSource;
    OptionsDom.onchange = e => {
        const source = OptionsDom.value;
        refreshNews(source);
    }
    
    if (navigator.serviceWorker) {
        try {
            navigator.serviceWorker.register('./sw.js').then(() => console.log('registered'))
        } catch (e) {
            console.log(e);
        }
    }
};

const refreshNews = async (source = defaultSource) => {
    let news = await getNews(source);
    BodyDom.innerHTML = news.map(convertNewsToSection).join('\n');
}

const convertSourceToOption = s => `<option value='${s.id}'>${s.name}</option>`;
const convertNewsToSection = n => `<section>
    <h1>${n.title}</h1>
    <img src="${n.urlToImage}" style="width: 100%;">
</section>`;


main();