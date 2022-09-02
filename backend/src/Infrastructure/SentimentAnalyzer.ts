import Sentiment from 'sentiment'
import { AnalysisResult } from "../Domain/AnalysisResult";

export class SentimentAnalyzer {
  analyze(text: string): AnalysisResult {
    const res = new Sentiment().analyze(text)
    return AnalysisResult.createFromProps(res)
  }
}