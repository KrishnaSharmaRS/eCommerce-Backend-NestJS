import { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { extension } from "mime";

export enum NODE_ENV {
  development = "development",
  production = "production",
  test = "test",
}

export const storage = diskStorage({
  destination: (_req, _file, callback) => callback(null, "images"),
  filename(_req, file, cb) {
    const uniqueSuffix = uuid();
    const fileExtension = extension(file.mimetype);

    cb(null, uniqueSuffix + "." + fileExtension);
  },
});
