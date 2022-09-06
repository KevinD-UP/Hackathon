import { ValueObject } from "./ValueObject";

type DateProps = {
  from: string;
  to: string;
};

export class Date extends ValueObject {
  from = "";
  to = "";

  static createFromProps(value: DateProps): Date {
    const { from, to } = value;

    return Date.create<Date>({
      from,
      to,
    });
  }
}
