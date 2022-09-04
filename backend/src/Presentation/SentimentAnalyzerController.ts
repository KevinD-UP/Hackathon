import {
  BaseHttpController,
  controller,
  httpPost,
  request, results
} from "inversify-express-utils";
import { inject } from "inversify";
import { SentimentFromTextUseCase } from "../Application/UseCases/SentimentFromTextUseCase";
import { Record, String } from "runtypes";
import { TextInput } from "../Domain/ValueObjects/TextInput";

@controller('/sentiment/analyzer')
export class SentimentAnalyzerController extends BaseHttpController {

  constructor(@inject(SentimentFromTextUseCase) private sentimentFromTextUseCase: SentimentFromTextUseCase) {
    super()
  }

  @httpPost('/')
  async analyze(@request() req: Request): Promise<results.JsonResult>{

    const validatedRequest = Record({ body: Record({text: String})}).validate(req)

    if (!validatedRequest.success) {
      return this.json(validatedRequest, 400)
    }

    const { text } = validatedRequest.value.body
    const argument = TextInput.createFromProps({text})

    const result = this.sentimentFromTextUseCase.execute(argument)

    return this.json(result, 200)
  }



}