const fastify = require("fastify")
const fileUpload = require("fastify-file-upload")
const cors = require("@fastify/cors")

const { Deta } = require("deta")

require("dotenv").config()

const app = fastify();
const deta = Deta(process.env.DETA);
const drive = deta.Base("fs");
const db = deta.Base("photos");

app.register(fileUpload);
app.register(cors, {
  origin: "*",
  methods: ["GET", "POST"],
  allowHeaders: ["Content-Type"],
});

app.get("/", async () => {
  return db.fetch();
});

app.get("/:id", async (req) => {
  const { id } = req.params;

  return db.get(id);
});

app.post("/add", async (req) => {
  const { file, title, variant } = req.body;

  const imageData = await drive.get(file);
  const posts = await db.fetch();

  let plagiarism = false;

  posts.items.map((i) => {
    // const similarity = compare(i?.image?.data, imageData?.data);
  });

  return db.put({
    variant,
    title,
    image: imageData,
    posts: posts.items,
  });
});

app.post("/upload", async (req) => {
  const { name, data } = req.body;
  return drive.insert({ data }, name);
});

app.get("/photo/:id", async (req) => {
  const { id } = req.params;
  return drive.get(id);
});

const run = async () => {
  try {
    await app.listen({ port: 3399 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

run();
