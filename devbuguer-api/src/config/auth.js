const jwtSecret = process.env.JWT_SECRET
const jwtExpiresIn = process.env.JWT_EXPIRES_IN

export default {
	secret: jwtSecret,
	expiresIn: jwtExpiresIn,
}
 