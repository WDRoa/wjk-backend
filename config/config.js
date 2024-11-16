require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
	isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
	apiKey: process.env.API_KEY,
	jwtSecret: process.env.JWT_SECRET,
	jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
	smtpEmail: process.env.SMTP_EMAIL,
	smtpPassword: process.env.SMTP_PASSWORD,
	defaultUserEmail: process.env.DEFAULT_USER_EMAIL,
	defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
	dbUrl: process.env.DATABASE_URL
}

module.exports = { config };

