import { Queue } from "bullmq";
import { redisconfig } from "./redis.config";

export const emailQueue = new Queue("emailQueue", {
  connection: redisconfig,
});