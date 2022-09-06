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
import { GetAverageMeteoDataUseCase } from "../Application/UseCases/GetAverageMeteoDataUseCase";
import { TextInput } from "../Domain/ValueObjects/TextInput";
import { MeteoData } from "../Domain/ValueObjects/MeteoData";
//import { Date } from "../Domain/ValueObjects/Date";

@controller("/meteostat")
export class MeteostatController extends BaseHttpController {
  constructor(
    @inject(GetAverageMeteoDataUseCase)
    private GetAverageMeteoDataUseCase: GetAverageMeteoDataUseCase
  ) {
    super();
  }

  @httpGet("/")
  async getAllMeteostat(@request() req: Request): Promise<results.JsonResult> {
    const validatedRequest = Record({
      body: Record({ from: String, to: String }),
    }).validate(req);

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400);
    }

    const { from, to } = validatedRequest.value.body;

    const result = await this.GetAverageMeteoDataUseCase.execute(
      TextInput.createFromProps({ text: from }),
      TextInput.createFromProps({ text: to })
    );

    return this.json(result, 200);
  }
}
