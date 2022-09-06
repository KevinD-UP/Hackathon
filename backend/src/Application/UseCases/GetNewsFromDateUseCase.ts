import { inject, injectable } from "inversify";
import { INewsAPI } from "../Abstraction/INewsAPI";
import { Date } from "../../Domain/ValueObjects/Date";
import { ISentimentAnalyzer } from "../Abstraction/ISentimentAnalyzer";
import { Text } from "../../Domain/ValueObjects/Text";
import { AnalysisResult } from "../../Domain/ValueObjects/AnalysisResult";
import { Article } from "../../Domain/ValueObjects/Article";

type GetNewsResult = {
  totalResults: number;
  averageEmotionScore: number;
  articlesWithAnalysis: { analysisResult: AnalysisResult; article: Article }[];
};

@injectable()
export class GetNewsFromDateUseCase {
  constructor(
    @inject(INewsAPI) private newsLister: INewsAPI,
    @inject(ISentimentAnalyzer) private sentimentAnalyzer: ISentimentAnalyzer
  ) {}

  async execute(period: Date): Promise<GetNewsResult> {
    const { totalResults, articles } = await this.newsLister.list(period);
    const analysisResults = articles.map((article) =>
      this.sentimentAnalyzer.analyze(
        Text.createFromProps({
          text: article.title + " " + article.description,
        })
      )
    );
    const averageEmotionScore = analysisResults.reduce(
      (acc, analysisResult) => acc + analysisResult.score,
      0
    );
    const articlesWithAnalysis = articles.map((article) => ({
      article: article,
      analysisResult: this.sentimentAnalyzer.analyze(
        Text.createFromProps({
          text: article.title + " " + article.description,
        })
      ),
    }));
    return {
      totalResults,
      averageEmotionScore,
      articlesWithAnalysis,
    };
  }
}
