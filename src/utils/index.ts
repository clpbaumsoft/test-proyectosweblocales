
export const validateEnv = () => {
  const requiredEnvVars = [
    "NEXT_PUBLIC_BASE_URL_BACKEND",
  ]
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  })
}