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
import { GetMonthlyMeteoDataUseCase } from "../Application/UseCases/GetMonthlyMeteoDataUseCase";
import { Text } from "../Domain/ValueObjects/Text";
import { MeteoData } from "../Domain/ValueObjects/MeteoData";
//import { Date } from "../Domain/ValueObjects/Date";

@controller("/monthlymeteostat")
export class MonthlyMeteostatController extends BaseHttpController {
  constructor(
    @inject(GetMonthlyMeteoDataUseCase)
    private GetMonthlyMeteoDataUseCase: GetMonthlyMeteoDataUseCase
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

    const result = await this.GetMonthlyMeteoDataUseCase.execute(
      Text.createFromProps({ text: station }),
      Text.createFromProps({ text: from }),
      Text.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }
}
