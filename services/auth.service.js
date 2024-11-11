const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { config } = require("./../config/config");
const UsersService = require("./user.service");
const service = new UsersService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();;
    }

    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
		const payload = { sub: user.userId, role: user.role };
		const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: "60min" });
		const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: "15d" });

		return { user, accessToken, refreshToken };
	}

	async refreshAccessToken(refreshToken) {
		try {
			const payload = jwt.verify(refreshToken, config.jwtRefreshSecret);
			const newAccessToken = jwt.sign(
				{ sub: payload.sub, role: payload.role },
				config.jwtSecret,
				{ expiresIn: "60min" }
			);

			return { accessToken: newAccessToken };

		} catch (error) {
				throw boom.unauthorized();
			}
	}

	async sendRecovery(email) {
		const user = await service.findByEmail(email);

		if (!user) {
			throw boom.unauthorized();
		}

		const payload = { sub: user.userId };
		const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
		const link = `http://myFrontend.com/recovery?token=${token}`;
		await service.update(user.userId, { recoveryToken: token });

		const mail = {
      from: config.smtpEmail, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Email to reset password.", // Subject line
      html: `<b>Hello ${user.names}! 🙂 Enter this link 👉 ${link} 👈 to reset your password.</b>`, // html body
    }

		const response = await this.sendMail(mail);
		return response;
	}

	async changePassword(token, newPassword) {
		try {
			const { sub } = jwt.verify(token, config.jwtSecret);
			const user = await service.findOne(sub);

			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}

			const hash = await bcrypt.hash(newPassword, 10);
			await service.update(user.userId, { password: hash, recoveryToken: null });
			return { message: "Password changed" };

		} catch (error) {
				throw boom.unauthorized();
			}
	}

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    });

    await transporter.sendMail(infoMail);

    return { message: "Mail sent" };
  }
}

module.exports = AuthService;
