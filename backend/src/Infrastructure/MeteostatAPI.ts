import { IMeteostatAPI } from "../Application/Abstraction/IMeteostatAPI";
import axios from "axios";
import { MeteoData } from "../Domain/ValueObjects/MeteoData";
import { MeteoArrayData } from "../Application/Abstraction/IMeteostatAPI";
import { inject } from "inversify";
import { TextInput } from "../Domain/ValueObjects/TextInput";

type MeteostatResult = {
  meta: {
    generated: string;
  };
  data: MeteoData[];
};

export class MeteostatAPI extends IMeteostatAPI {
  async getMeteoData(
    station: string,
    start: TextInput,
    end: TextInput
  ): Promise<MeteoArrayData> {
    const config = {
      headers: {
        "X-RapidAPI-Key": "" + process.env.METEOSTAT_API_KEY,
        "X-RapidAPI-Host": "meteostat.p.rapidapi.com",
      },
    };

    const url = `https://meteostat.p.rapidapi.com/stations/daily?station=${station}&start=${start.text}&end=${end.text}`;

    console.log(url);

    const { data } = await axios.get<MeteostatResult>(url, config);
    return {
      meteoData: data.data,
    };
  }
}
