import { injectable } from "inversify";
import { AnalysisResult } from "../../Domain/ValueObjects/AnalysisResult";
import { Text } from "../../Domain/ValueObjects/Text";

@injectable()
export abstract class ISentimentAnalyzer {
  abstract analyze(text: Text): AnalysisResult;
}
