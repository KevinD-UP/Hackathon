import { ValueObject } from "./ValueObject";

type UrlProps = {
  url: string;
};

export class Url extends ValueObject {
  url = "";

  static createFromProps(value: UrlProps): Url {
    const { url } = value;

    return Url.create<Url>({
      url,
    });
  }
}
