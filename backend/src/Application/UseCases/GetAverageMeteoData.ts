import { inject, injectable } from "inversify";
import { IMeteoApi } from "../Abstraction/IMeteoApi";
import { TextInput } from "../../Domain/ValueObjects/TextInput";
import { MeteoData } from "../../Domain/ValueObjects/MeteoData";
import { MeteoArrayData } from "../../Domain/ValueObjects/MeteoArrayData";

@injectable()
export class GetAverageMeteoData {
  private station = ["07156", "07222", "07630", "07480", "07015"];

  constructor(@inject(IMeteoApi) private meteoApi: IMeteoApi) {}

  execute(start: TextInput, end: TextInput): MeteoArrayData {
    const meteoData: MeteoArrayData[] = this.station.map((element: string) =>
      this.meteoApi.getMeteoData(element, start, end)
    );
    const avgMeteoData = meteoData.reduce((acc, element) => {
      for (let i = 0; i < acc.numberOfDays; i++) {
        acc.meteoData[i].temperature += element.meteoData[i].temperature;
        acc.meteoData[i].precipitation += element.meteoData[i].precipitation;
      }
      return acc;
    });
    avgMeteoData.meteoData.forEach((element) => {
      element.temperature /= avgMeteoData.numberOfDays;
      element.precipitation /= avgMeteoData.numberOfDays;
    });
    return avgMeteoData;
  }
}
