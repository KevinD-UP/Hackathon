import { ValueObject } from "./ValueObject";

type AnalysisResultProps = {
  score: number;
};

export class AnalysisResult extends ValueObject {
  score = 0;

  static createFromProps(value: AnalysisResultProps): AnalysisResult {
    const { score } = value;

    return AnalysisResult.create<AnalysisResult>({
      score,
    });
  }
}
