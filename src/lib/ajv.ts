import Ajv, { JSONSchemaType } from "ajv";
import { JTDDataType } from "ajv/dist/jtd";

declare global {
  var ajv: Ajv | undefined;
}

if (!global.ajv) {
  global.ajv = new Ajv();
}

let ajv: Ajv = global.ajv;

export { ajv };

export type { JSONSchemaType, JTDDataType };
