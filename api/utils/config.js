module.exports = {
    JWT_PASSWORD: process.env.JWTPASSWORD || 'password',
    DB_USER: process.env.DB_USER || 'tenpo-api',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'myterraformpublicipdbtenpoapi.eastus.cloudapp.azure.com',
    DB_DATABASE: process.env.DB_HOST || 'tenpo-api',
    DB_PORT: process.env.DB_HOST || 5432
  };