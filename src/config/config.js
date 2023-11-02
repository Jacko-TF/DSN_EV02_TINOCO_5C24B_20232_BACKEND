require('dotenv').config()

module.exports = {
    port : process.env.PORT || 9000,
    uri : process.env.URI || "",
    audience : process.env.AUDIENCE,
    issuerBaseURL : process.env.issuerBaseURL
}