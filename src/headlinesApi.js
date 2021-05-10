import { NEWS_API_KEY, COUNTRY} from "./config";

export const getTopHeadLines = async (page) => {


    const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&sortBy=date&page=${page}&pageSize=10&apiKey=${NEWS_API_KEY}`

    );
    const json = await response.json();
    console.log(json);
    return json;

};

export const getNextNewsArticles = async () =>{
 const response = await fetch(

 );
 const json = await response.json();
 return json;
}
