import { injectable } from "inversify";
import { MeteoData } from "../../Domain/ValueObjects/MeteoData";
import { Text } from "../../Domain/ValueObjects/Text";
import { MeteoDataSimplify } from "../../Domain/ValueObjects/MeteoDataSimplify";

export type MeteoArrayData = { meteoData: MeteoData[] };
export type MeteoArrayDataSimplify = { meteoData: MeteoDataSimplify[] };

@injectable()
export abstract class IMeteoAPI {
  abstract getMeteoData(
    station: string,
    start: Text,
    end: Text
  ): Promise<MeteoArrayData>;

  abstract getDailyMeteoData(
    station: Text,
    start: Text,
    end: Text
  ): Promise<MeteoArrayDataSimplify>;

  abstract getMonthlyMeteoData(
    station: Text,
    start: Text,
    end: Text
  ): Promise<MeteoArrayDataSimplify>;

  abstract getMoyenneOfSeasonMeteoData(
    station: Text,
    start: Text,
    end: Text
  ): Promise<MeteoArrayDataSimplify>;
}
