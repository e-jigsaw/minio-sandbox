import { Client } from "minio";
import { readdirSync } from "fs";

const client = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

for (const dir of readdirSync("/Volumes/test1/output")) {
  for (const file of readdirSync(`/Volumes/test1/output/${dir}`)) {
    const res = await client.fPutObject(
      "mystation",
      `output/${dir}/${file}`,
      `/Volumes/test1/output/${dir}/${file}`
    );
    console.log(res);
  }
}
