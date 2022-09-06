import "reflect-metadata";

import { Container } from "inversify";
import { ISentimentAnalyzer } from "../Application/Abstraction/ISentimentAnalyzer";
import { SentimentAnalyzer } from "../Infrastructure/SentimentAnalyzer";
import { SentimentFromTextUseCase } from "../Application/UseCases/SentimentFromTextUseCase";
import { INewsAPI } from "../Application/Abstraction/INewsAPI";
import { NewsAPI } from "../Infrastructure/NewsAPI";
import { GetNewsFromDateUseCase } from "../Application/UseCases/GetNewsFromDateUseCase";

const container = new Container();
container.bind(ISentimentAnalyzer).to(SentimentAnalyzer);
container.bind(INewsAPI).to(NewsAPI);
container.bind(SentimentFromTextUseCase).toSelf();
container.bind(GetNewsFromDateUseCase).toSelf();

export { container };
