import { inject, injectable } from "inversify";
import { ISentimentAnalyzer } from "../Abstraction/ISentimentAnalyzer";
import { TextInput } from "../../Domain/ValueObjects/TextInput";
import { AnalysisResult } from "../../Domain/ValueObjects/AnalysisResult";

@injectable()
export class SentimentFromTextUseCase {

  constructor(@inject(ISentimentAnalyzer) private sentimentAnalyzer: ISentimentAnalyzer) {

  }

  execute(text: TextInput): AnalysisResult {
    return this.sentimentAnalyzer.analyze(text)
  }

}