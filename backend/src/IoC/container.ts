import "reflect-metadata";

import { Container } from "inversify";
import { ISentimentAnalyzer } from "../Application/Abstraction/ISentimentAnalyzer";
import { SentimentAnalyzer } from "../Infrastructure/SentimentAnalyzer";
import { SentimentFromTextUseCase } from "../Application/UseCases/SentimentFromTextUseCase";
import { INewsAPI } from "../Application/Abstraction/INewsAPI";
import { NewsAPI } from "../Infrastructure/NewsAPI";
import { GetNewsFromDateUseCase } from "../Application/UseCases/GetNewsFromDateUseCase";
import { IMeteoAPI } from "../Application/Abstraction/IMeteoAPI";
import { MeteostatAPI } from "../Infrastructure/MeteostatAPI";
import { GetAverageMeteoDataUseCase } from "../Application/UseCases/GetAverageMeteoDataUseCase";
import { GetDailyMeteoDataUseCase } from "../Application/UseCases/GetDailyMeteoDataUseCase";
import { GetMonthlyMeteoDataUseCase } from "../Application/UseCases/GetMonthlyMeteoDataUseCase";
import { GetMonthRecordTemperatureUseCase } from "../Application/UseCases/GetMonthRecordTemperatureUseCase";
import { GetDayRecordTemperatureUseCase } from "../Application/UseCases/GetDayRecordTemperatureUseCase";

const container = new Container();
container.bind(ISentimentAnalyzer).to(SentimentAnalyzer);
container.bind(INewsAPI).to(NewsAPI);
container.bind(SentimentFromTextUseCase).toSelf();
container.bind(GetNewsFromDateUseCase).toSelf();

container.bind(IMeteoAPI).to(MeteostatAPI);
container.bind(GetAverageMeteoDataUseCase).toSelf();
container.bind(GetDailyMeteoDataUseCase).toSelf();
container.bind(GetMonthlyMeteoDataUseCase).toSelf();
container.bind(GetMonthRecordTemperatureUseCase).toSelf();
container.bind(GetDayRecordTemperatureUseCase).toSelf();
export { container };
