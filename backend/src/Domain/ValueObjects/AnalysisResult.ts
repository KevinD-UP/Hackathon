import { ValueObject } from "./ValueObject";

type AnalysisResultProps = {
  score: number;
  comparative: number;
  calculation: Array<{
    [token: string]: number;
  }>;
  tokens: string[];
  words: string[];
  positive: string[];
  negative: string[];
};

export class AnalysisResult extends ValueObject {
  score = 0;
  comparative = 0;
  calculation = {};
  tokens = [""];
  words = [""];
  positive = [""];
  negative = [""];

  static createFromProps(value: AnalysisResultProps): AnalysisResult {
    const {
      score,
      comparative,
      calculation,
      tokens,
      words,
      positive,
      negative,
    } = value;

    return AnalysisResult.create<AnalysisResult>({
      score,
      comparative,
      calculation,
      tokens,
      words,
      positive,
      negative,
    });
  }
}
