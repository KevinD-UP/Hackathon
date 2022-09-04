import "reflect-metadata";

import { Container } from "inversify";
import { ISentimentAnalyzer } from "../Application/Abstraction/ISentimentAnalyzer";
import { SentimentAnalyzer } from "../Infrastructure/SentimentAnalyzer";
import { SentimentFromTextUseCase } from "../Application/UseCases/SentimentFromTextUseCase";

const container = new Container();
container.bind(ISentimentAnalyzer).to(SentimentAnalyzer);
container.bind(SentimentFromTextUseCase).toSelf();

export { container };
