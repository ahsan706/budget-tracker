let dbPath = 'mongodb://localhost/budget-tracker';
if (process.env.DB_URL && process.env.DB_PASSWORD && process.env.DB_NAME) {
  dbPath = `mongodb+srv://${process.env.DB_URL}:${process.env.DB_PASSWORD}@cluster0.idfhi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}
const port = process.env.PORT || 8080;
module.exports = { dbPath, port };
