import { ValueObject } from "./ValueObject";
import { Text } from "./Text";

type MeteoDataSimplifyProps = {
  date: Text;
  tavg: number;
  tmin: number;
  tmax: number;
  prcp: number;
  snow: number;
};

export class MeteoDataSimplify extends ValueObject {
  date = Text.createDefault();
  tavg = 0;
  tmin = 0;
  tmax = 0;
  prcp = 0;
  snow = 0;

  static createFromProps(value: {
    date: ValueObject;
    tmax: any;
    snow: any;
    tavg: any;
    tmin: any;
    prcp: any;
  }): MeteoDataSimplify {
    const { date, tavg, tmin, tmax, prcp, snow } = value;

    return MeteoDataSimplify.create<MeteoDataSimplify>({
      date,
      tavg,
      tmin,
      tmax,
      prcp,
      snow,
    });
  }
}
