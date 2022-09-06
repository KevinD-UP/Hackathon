import { injectable } from "inversify";
import { MeteoArrayData } from "../../Domain/ValueObjects/MeteoArrayData";
import { TextInput } from "../../Domain/ValueObjects/TextInput";

@injectable()
export abstract class IMeteoApi {
    abstract getMeteoData(station: string, start: TextInput, end: TextInput): MeteoArrayData;
}
