import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  results,
} from "inversify-express-utils";
import { inject } from "inversify";
import { Request } from "express";
import { InstanceOf, Record, String } from "runtypes";
import { GetDailyMeteoDataUseCase } from "../Application/UseCases/GetDailyMeteoDataUseCase";
import { Text } from "../Domain/ValueObjects/Text";
import { MeteoData } from "../Domain/ValueObjects/MeteoData";
//import { Date } from "../Domain/ValueObjects/Date";

@controller("/dailymeteostat")
export class DailyMeteostatController extends BaseHttpController {
  constructor(
    @inject(GetDailyMeteoDataUseCase)
    private GetDailyMeteoDataUseCase: GetDailyMeteoDataUseCase
  ) {
    super();
  }

  @httpGet("/")
  async getAllMeteostat(@request() req: Request): Promise<results.JsonResult> {
    const validatedRequest = Record({
      body: Record({ station: String, from: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { station, from, to } = validatedRequest.value.body;

    const result = await this.GetDailyMeteoDataUseCase.execute(
      Text.createFromProps({ text: station }),
      Text.createFromProps({ text: from }),
      Text.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }

  @httpGet("/:station/:from/:to")
  async getAllMeteostatParams(
    @request() req: Request
  ): Promise<results.JsonResult> {
    const validatedRequest = Record({
      params: Record({ station: String, from: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { station, from, to } = validatedRequest.value.params;

    const result = await this.GetDailyMeteoDataUseCase.execute(
      Text.createFromProps({ text: station }),
      Text.createFromProps({ text: from }),
      Text.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }
}
