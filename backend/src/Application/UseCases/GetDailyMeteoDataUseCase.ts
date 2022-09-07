import { inject, injectable } from "inversify";
import { IMeteoAPI } from "../Abstraction/IMeteoAPI";
import { Text } from "../../Domain/ValueObjects/Text";
import { MeteoDataSimplify } from "../../Domain/ValueObjects/MeteoDataSimplify";

@injectable()
export class GetDailyMeteoDataUseCase {
  constructor(@inject(IMeteoAPI) private meteoApi: IMeteoAPI) {}

  async execute(
    station: Text,
    start: Text,
    end: Text
  ): Promise<MeteoDataSimplify[]> {
    const res = await this.meteoApi.getDailyMeteoData(station, start, end);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const resultSimplify = res.meteoData.map((test) =>
      MeteoDataSimplify.createFromProps({
        date: test.date,
        tavg: test.tavg,
        tmin: test.tmin,
        tmax: test.tmax,
        prcp: test.prcp,
        snow: test.snow,
      })
    );
    return resultSimplify;
  }
}
