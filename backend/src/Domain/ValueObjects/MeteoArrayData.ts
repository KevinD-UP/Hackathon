import { ValueObject } from "./ValueObject";
import { MeteoData } from "./MeteoData";

type MeteoArrayDataProps = {
  numberOfDays: number;
  meteoData: MeteoData[];
};

export class MeteoArrayData extends ValueObject {
  numberOfDays = 0;
  meteoData: MeteoData[] = [];

  static createFromProps(value: MeteoArrayDataProps): MeteoArrayData {
    const { numberOfDays, meteoData } = value;

    return MeteoArrayData.create<MeteoArrayData>({
      numberOfDays,
      meteoData,
    });
  }
}
