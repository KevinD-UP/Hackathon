import { ValueObject } from "./ValueObject";

type MeteoDataProps = {
  temperature: number;
  precipitation: number;
};

export class MeteoData extends ValueObject {
  temperature = 0;
  precipitation = 0;

  static createFromProps(value: MeteoDataProps): MeteoData {
    const { temperature, precipitation } = value;

    return MeteoData.create<MeteoData>({
      temperature,
      precipitation,
    });
  }
}
