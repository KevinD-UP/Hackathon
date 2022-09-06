import { ValueObject } from "./ValueObject";

type TextProps = {
  text: string;
};

export class Text extends ValueObject {
  text = "";

  static createFromProps(value: TextProps): Text {
    const { text } = value;

    return Text.create<Text>({
      text,
    });
  }
}
