const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const reposiory = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(reposiory);

  return response.json(reposiory);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findIndex = repositories.findIndex((reposiory) => reposiory.id === id);

  if (findIndex === -1) {
    return response.status(400).json({ error: "repository does not exists" });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findIndex].likes,
  };

  repositories[findIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (findIndex >= 0) {
    repositories.splice(findIndex, 1);
  } else {
    return response.status(400).json({ error: "Repository does not exists" });
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (findIndex === -1) {
    return response.status(400).json({ error: "repository does not exists" });
  }

  repositories[findIndex].likes++;

  return response.json(repositories[findIndex]);
});

module.exports = app;
