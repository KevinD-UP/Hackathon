import { inject, injectable } from "inversify";
import { IMeteoAPI } from "../Abstraction/IMeteoAPI";
import { Text } from "../../Domain/ValueObjects/Text";
import { MeteoArrayData } from "../Abstraction/IMeteoAPI";

@injectable()
export class GetDailyMeteoDataUseCase {
  constructor(@inject(IMeteoAPI) private meteoApi: IMeteoAPI) {}

  async execute(
    station: Text,
    start: Text,
    end: Text
  ): Promise<MeteoArrayData> {
    const res = await this.meteoApi.getDailyMeteoData(station, start, end);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return res;
  }
}
