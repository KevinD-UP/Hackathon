import { injectable } from "inversify";
import { AnalysisResult } from "../../Domain/ValueObjects/AnalysisResult";
import { TextInput } from "../../Domain/ValueObjects/TextInput";

@injectable()
export abstract class ISentimentAnalyzer {
  abstract analyze(text: TextInput): AnalysisResult;
}
