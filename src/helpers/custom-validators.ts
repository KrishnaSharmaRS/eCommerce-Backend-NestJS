import { registerDecorator, ValidationOptions } from "class-validator";

export function IsStringLength(options: { min: number; max: number }, validationOptions?: ValidationOptions) {
  const message = `$property must be ${options.min} to ${options.max} characters long`;

  if (!validationOptions) validationOptions = { message };
  else if (!validationOptions.message) validationOptions.message = message;

  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: "isStringLength",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") return false;

          const trimmedValue = value.trim();

          return trimmedValue.length >= options.min && trimmedValue.length <= options.max;
        },
      },
    });
  };
}
