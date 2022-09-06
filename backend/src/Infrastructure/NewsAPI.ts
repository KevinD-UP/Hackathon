import {
  FormattedArticle,
  INewsAPI,
} from "../Application/Abstraction/INewsAPI";
import axios from "axios";
import { Date } from "../Domain/ValueObjects/Date";
import { inject } from "inversify";
import { Article } from "../Domain/ValueObjects/Article";

type NewsApiResult = {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
};

export class NewsAPI extends INewsAPI {
  constructor() {
    super();
  }

  async list(period: Date): Promise<FormattedArticle> {
    const url = `https://newsapi.org/v2/everything?q=("réchauffement climatique" OR "changement climatique" OR "dérèglement climatique")&from=${period.from}&to=${period.to}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}&language=fr`;
    const { data } = await axios.get<NewsApiResult>(url);
    const articles = data.articles.map((article) =>
      Article.createFromProps({ sourceName: article.source.name, ...article })
    );
    return {
      totalResults: data.totalResults,
      articles,
    };
  }
}
