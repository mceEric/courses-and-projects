const fetch = require("node-fetch");

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch("http://localhost:3000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  return response.json();
}

const index = async (req, res) => {
  const query = `{
    users {
      id
      name
    }
  }`;
  const response = await fetchGraphQL(query);
  return res.render("index", {
    intro: "Welcome :)",
    users: response.data.users,
  });
};

const userinfo = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const query = `{
      user(id: ${id}) {
        id
        name
        car {
          id
          make
          model
          color
        }
      }
    }`;
    const response = await fetchGraphQL(query);
    return res.render("user", {
      data: response.data.user,
    });
  }
  return res.status(400).send("Please provide an ID");
};

module.exports = {
  index,
};
