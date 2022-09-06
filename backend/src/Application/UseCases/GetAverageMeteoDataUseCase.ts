import { inject, injectable } from "inversify";
import { IMeteostatAPI } from "../Abstraction/IMeteostatAPI";
import { TextInput } from "../../Domain/ValueObjects/TextInput";
import { MeteoArrayData } from "../Abstraction/IMeteostatAPI";

@injectable()
export class GetAverageMeteoDataUseCase {
  private station = ["07156", "07222", "07630", "07480", "07015"];

  constructor(@inject(IMeteostatAPI) private meteoApi: IMeteostatAPI) {}

  async execute(start: TextInput, end: TextInput): Promise<MeteoArrayData> {
    /*const meteoData = await Promise.all(
      this.station.map((element: string) =>
        this.meteoApi.getMeteoData(element, start, end)
      )
    );*/

    /*const avgMeteoData = meteoData.reduce((acc, element) => {
      for (let i = 0; i < acc.meteoData.length; i++) {
        acc.meteoData[i].tavg += element.meteoData[i].tavg;
        acc.meteoData[i].prcp += element.meteoData[i].prcp;
      }
      return acc;
    });
    avgMeteoData.meteoData.forEach((element) => {
      element.tavg /= avgMeteoData.meteoData.length;
      element.prcp /= avgMeteoData.meteoData.length;
    });*/
    return await this.meteoApi.getMeteoData(this.station[0], start, end);
  }
}
