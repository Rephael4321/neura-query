export async function GET() {
  return new Response(
    JSON.stringify({
      provider: "neon",
      username: process.env.DEMO_DB_USERNAME,
      password: process.env.DEMO_DB_PASSWORD,
      host: process.env.DEMO_DB_HOST,
      port: "",
      DBName: process.env.DEMO_DB_DB_NAME,
    }),
    {
      status: 200,
    }
  );
}
