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
import { GetRecordTemperatureInFranceUseCase } from "../Application/UseCases/GetRecordTemperatureInFranceUseCase";
import { Text } from "../Domain/ValueObjects/Text";


@controller("/recordtemperature")
export class RecordTemperatureInFranceController extends BaseHttpController {
  constructor(
    @inject(GetRecordTemperatureInFranceUseCase)
    private GetRecordTemperatureInFranceUseCase: GetRecordTemperatureInFranceUseCase
  ) {
    super();
  }

  @httpGet("/")
  async getRecordTemperature(@request() req: Request): Promise<results.JsonResult> {
    const validatedRequest = Record({
      body: Record({ month: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { month } = validatedRequest.value.body;

    const result = await this.GetRecordTemperatureInFranceUseCase.execute(
      Text.createFromProps({ text: month })
    );

    return this.json(result, 200);
  }
}
