/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://MockAI_owner:QT9hXvlBLY6w@ep-billowing-dust-a1f97z9q.ap-southeast-1.aws.neon.tech/MockAI?sslmode=require',
    }
  };