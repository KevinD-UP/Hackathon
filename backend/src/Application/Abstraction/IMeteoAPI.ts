import { injectable } from "inversify";
import { MeteoData } from "../../Domain/ValueObjects/MeteoData";
import { Text } from "../../Domain/ValueObjects/Text";

export type MeteoArrayData = { meteoData: MeteoData[] };

@injectable()
export abstract class IMeteoAPI {
  abstract getMeteoData(
    station: string,
    start: Text,
    end: Text
  ): Promise<MeteoArrayData>;
}
