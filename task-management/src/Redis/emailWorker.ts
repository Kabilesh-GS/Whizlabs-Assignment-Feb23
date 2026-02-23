import { Worker, Job } from "bullmq";
import { redisconfig } from "./redis.config";

new Worker("emailQueue", async (job: Job) => {
    console.log("Job Started");
    console.log(`
      To: ${job.data.email}
      Welcome ${job.data.name}
    `);
  },
  { connection: redisconfig }
);