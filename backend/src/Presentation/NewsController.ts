import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  results,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request } from "express";
import { Record, String } from "runtypes";
import { GetNewsFromDateUseCase } from "../Application/UseCases/GetNewsFromDateUseCase";
import { Date } from "../Domain/ValueObjects/Date";

@controller("/news")
export class NewsController extends BaseHttpController {
  constructor(
    @inject(GetNewsFromDateUseCase)
    private getNewsFromDateUseCase: GetNewsFromDateUseCase
  ) {
    super();
  }

  @httpGet("/")
  async getAllNews(@request() req: Request): Promise<results.JsonResult> {
    const validatedRequest = Record({
      body: Record({ from: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { from, to } = validatedRequest.value.body;
    const argument = Date.createFromProps({ from, to });

    const result = await this.getNewsFromDateUseCase.execute(argument);

    return this.json(result, 200);
  }

  @httpGet("/:from/:to")
  async getAllNewsDate(@request() req: Request): Promise<results.JsonResult> {
    const validatedRequest = Record({
      params: Record({ from: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { from, to } = validatedRequest.value.params;
    const argument = Date.createFromProps({ from, to });

    const result = await this.getNewsFromDateUseCase.execute(argument);

    return this.json(result, 200);
  }
}
