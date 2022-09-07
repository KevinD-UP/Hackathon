import { inject, injectable } from "inversify";
import { Text } from "../../Domain/ValueObjects/Text";

type Temperature = { temperatureRecord: number };

@injectable()
export class GetRecordTemperatureInFranceUseCase {
  private record = [
    8.4, 10.1, 11, 14.7, 17.8, 22.4, 24.4, 24.8, 20.3, 16.3, 11.4, 9.5,
  ];

  async execute(month: Text): Promise<Temperature> {
    const monthInt: number = +month.text;
    return { temperatureRecord: this.record[monthInt] };
  }
}
