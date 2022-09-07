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
import { GetDayRecordTemperatureUseCase } from "../Application/UseCases/GetDayRecordTemperatureUseCase";
import { Text } from "../Domain/ValueObjects/Text";

@controller("/dayrecordtemperature")
export class DayRecordTemperatureController extends BaseHttpController {
  constructor(
    @inject(GetDayRecordTemperatureUseCase)
    private GetDayRecordTemperatureUseCase: GetDayRecordTemperatureUseCase
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

    const result = await this.GetDayRecordTemperatureUseCase.execute(
      Text.createFromProps({ text: start }),
      Text.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }
}
