import { ValueObject } from "./ValueObject";
import { Text } from "./Text";

type MeteoDataProps = {
  date: Text;
  tavg: number;
  tmin: number;
  tmax: number;
  prcp: number;
  snow: number;
  wdir: number;
  wspd: number;
  wpgt: number;
  pres: number;
  tsun: number;
};

export class MeteoData extends ValueObject {
  date = Text.createDefault();
  tavg = 0;
  tmin = 0;
  tmax = 0;
  prcp = 0;
  snow = 0;
  wdir = 0;
  wspd = 0;
  wpgt = 0;
  pres = 0;
  tsun = 0;

  static createFromProps(value: MeteoDataProps): MeteoData {
    const { date, tavg, tmin, tmax, prcp, snow, wdir, wspd, wpgt, pres, tsun } =
      value;

    return MeteoData.create<MeteoData>({
      date,
      tavg,
      tmin,
      tmax,
      prcp,
      snow,
      wdir,
      wspd,
      wpgt,
      pres,
      tsun,
    });
  }
}
