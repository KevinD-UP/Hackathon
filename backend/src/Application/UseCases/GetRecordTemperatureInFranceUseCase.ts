import { inject, injectable } from "inversify";
import { Text } from "../../Domain/ValueObjects/Text";

type Temperature = { month: number; year: number; temperature: number };

@injectable()
export class GetRecordTemperatureInFranceUseCase {
  private record = [
    { year: 2018, temperature: 8.4 },
    { year: 1990, temperature: 8.4 },
    { year: 2017, temperature: 8.4 },
    { year: 2007, temperature: 8.4 },
    { year: 2022, temperature: 8.4 },
    { year: 2003, temperature: 8.4 },
    { year: 2006, temperature: 8.4 },
    { year: 2003, temperature: 8.4 },
    { year: 1949, temperature: 8.4 },
    { year: 2001, temperature: 8.4 },
    { year: 1994, temperature: 8.4 },
    { year: 2015, temperature: 8.4 },
  ];

  async execute(start: Text, to: Text): Promise<Temperature[]> {
    const startMonth: number = +start.text.split("-")[1] - 1;
    const endMonth: number = +to.text.split("-")[1] - 1;
    const result: Temperature[] = [];
    for (let i = startMonth; i <= endMonth; i++) {
      result.push({
        month: i + 1,
        year: this.record[i].year,
        temperature: this.record[i].temperature,
      });
    }
    return result;
  }
}
