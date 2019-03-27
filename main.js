const apiKey = 'ee6e8f12642745248590ff138c7b1134',
    defaultSource = 'bbc-news';

const OptionsDom = document.getElementById('sources');

const getSources = () => fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`)
    .then(r => r.json())
    .then(({ sources }) => sources);

const getNews = (source = defaultSource) => fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`)
    .then(r => r.json())
    .then(({ articles }) => articles);


const main = async () => {
    let sources = await getSources();
    OptionsDom.innerHTML = sources.map(convertSourceToOption).join('\n');
    OptionsDom.value = defaultSource;
};

const convertSourceToOption = s => `<option value='${s.id}'>${s.name}</option>`;


main();