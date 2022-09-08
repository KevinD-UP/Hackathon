// eslint-disable-next-line @typescript-eslint/no-var-requires
const sentiment = require("node-sentiment");
import { AnalysisResult } from "../Domain/ValueObjects/AnalysisResult";
import { Text } from "../Domain/ValueObjects/Text";
import { ISentimentAnalyzer } from "../Application/Abstraction/ISentimentAnalyzer";

export class SentimentAnalyzer extends ISentimentAnalyzer {
  analyze(text: Text): AnalysisResult {
    const result = sentiment(text.text);
    const wholeTextScore = result.score;
    return AnalysisResult.createFromProps({ score: wholeTextScore });
  }
}
