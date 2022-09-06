import { ValueObject } from "./ValueObject";

type ArticleProps = {
  sourceName: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
};

export class Article extends ValueObject {
  sourceName = "";
  author = "";
  title = "";
  description = "";
  url = "";
  urlToImage = "";
  publishedAt = "";

  static createFromProps(value: ArticleProps): Article {
    const {
      sourceName,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
    } = value;

    return Article.create<Article>({
      sourceName,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
    });
  }
}
