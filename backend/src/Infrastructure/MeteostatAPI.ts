import { IMeteoAPI } from "../Application/Abstraction/IMeteoAPI";
import axios from "axios";
import { MeteoData } from "../Domain/ValueObjects/MeteoData";
import { MeteoArrayData } from "../Application/Abstraction/IMeteoAPI";
import { Text } from "../Domain/ValueObjects/Text";

type MeteostatResult = {
  meta: {
    generated: string;
  };
  data: MeteoData[];
};

export class MeteostatAPI extends IMeteoAPI {
  async getMeteoData(
    station: string,
    start: Text,
    end: Text
  ): Promise<MeteoArrayData> {
    const config = {
      headers: {
        "X-RapidAPI-Key": "" + process.env.METEOSTAT_API_KEY,
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    };

    const url = `https://meteostat.p.rapidapi.com/stations/daily?station=${station}&start=${start.text}&end=${end.text}`;
    console.log(url);
    const response = await axios.get(url, config);
    return {
      meteoData: response.data,
    };
  }
}
