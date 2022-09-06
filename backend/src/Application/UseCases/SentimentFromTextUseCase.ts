import { inject, injectable } from "inversify";
import { ISentimentAnalyzer } from "../Abstraction/ISentimentAnalyzer";
import { Text } from "../../Domain/ValueObjects/Text";
import { AnalysisResult } from "../../Domain/ValueObjects/AnalysisResult";

@injectable()
export class SentimentFromTextUseCase {
  constructor(
    @inject(ISentimentAnalyzer) private sentimentAnalyzer: ISentimentAnalyzer
  ) {}

  execute(text: Text): AnalysisResult {
    return this.sentimentAnalyzer.analyze(text);
  }
}
