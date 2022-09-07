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
import { GetMonthRecordTemperatureUseCase } from "../Application/UseCases/GetMonthRecordTemperatureUseCase";
import { Text } from "../Domain/ValueObjects/Text";

@controller("/monthrecordtemperature")
export class RecordTemperatureInFranceController extends BaseHttpController {
  constructor(
    @inject(GetMonthRecordTemperatureUseCase)
    private GetMonthRecordTemperatureUseCase: GetMonthRecordTemperatureUseCase
  ) {
    super();
  }

  @httpGet("/:start/:to")
  async getRecordTemperature(
    @request() req: Request
  ): Promise<results.JsonResult> {
    const validatedRequest = Record({
      params: Record({ start: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { start, to } = validatedRequest.value.params;

    const result = await this.GetMonthRecordTemperatureUseCase.execute(
      Text.createFromProps({ text: start }),
      Text.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }
}
