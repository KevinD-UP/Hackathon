import { injectable } from "inversify";
import { MeteoData } from "../../Domain/ValueObjects/MeteoData";
import { TextInput } from "../../Domain/ValueObjects/TextInput";

export type MeteoArrayData = { meteoData: MeteoData[] };

@injectable()
export abstract class IMeteostatAPI {
  abstract getMeteoData(
    station: string,
    start: TextInput,
    end: TextInput
  ): Promise<MeteoArrayData>;
}
