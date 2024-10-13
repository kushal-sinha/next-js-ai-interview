import { defineConfig } from "drizzle-kit";
export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: "postgresql://accounts:IavWqUdYi67B@ep-solitary-tooth-a5h0qxbf.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
    },
});


