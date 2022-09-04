import { ValueObject } from "./ValueObject";

type TextInputProps = {
  text: string
}

export class TextInput extends ValueObject {
  text = ''

  static createFromProps(value: TextInputProps): TextInput {

    const {text} = value

    return TextInput.create<TextInput>({
      text
    })
  }

}