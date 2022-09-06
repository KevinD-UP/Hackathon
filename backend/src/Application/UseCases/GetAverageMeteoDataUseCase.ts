import { inject, injectable } from "inversify";
import { IMeteoAPI } from "../Abstraction/IMeteoAPI";
import { Text } from "../../Domain/ValueObjects/Text";
import { MeteoArrayData } from "../Abstraction/IMeteoAPI";

@injectable()
export class GetAverageMeteoDataUseCase {
  private stations = ["07156", "07222", "07630", "07480", "07015"];

  constructor(@inject(IMeteoAPI) private meteoApi: IMeteoAPI) {}

  async execute(start: Text, end: Text): Promise<MeteoArrayData> {
    const meteoData: MeteoArrayData[] = [];
    for (const station of this.stations) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      meteoData.push(await this.meteoApi.getMeteoData(station, start, end));
    }

    const avgMeteoData = meteoData.reduce((acc, element) => {
      for (let i = 0; i < acc.meteoData.length; i++) {
        acc.meteoData[i].tavg += element.meteoData[i].tavg;
        acc.meteoData[i].prcp += element.meteoData[i].prcp;
      }
      return acc;
    });

    for (let i = 0; i < avgMeteoData.meteoData.length; i++) {
      avgMeteoData.meteoData[i].tavg /= this.stations.length;
      avgMeteoData.meteoData[i].prcp /= this.stations.length;
    }

    return avgMeteoData;
  }
}
