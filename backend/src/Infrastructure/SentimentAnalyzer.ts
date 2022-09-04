import Sentiment from 'sentiment'
import { AnalysisResult } from "../Domain/ValueObjects/AnalysisResult";
import { TextInput } from "../Domain/ValueObjects/TextInput";
import { ISentimentAnalyzer } from "../Application/Abstraction/ISentimentAnalyzer";

export class SentimentAnalyzer extends ISentimentAnalyzer{
  analyze(text: TextInput): AnalysisResult {
    const res = new Sentiment().analyze(text.text)
    return AnalysisResult.createFromProps(res)
  }
}