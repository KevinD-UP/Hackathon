import { injectable } from "inversify";
import { Date } from "../../Domain/ValueObjects/Date";
import { Article } from "../../Domain/ValueObjects/Article";

export type FormattedArticle = { totalResults: number; articles: Article[] };

@injectable()
export abstract class INewsAPI {
  abstract list(period: Date): Promise<FormattedArticle>;
}
