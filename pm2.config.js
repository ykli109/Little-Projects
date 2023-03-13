module.exports = {
  apps: [
    {
      name: "little-project-static-server",
      // interpreter: "/Users/lyk/.nvm/versions/node/v16.14.2/bin/npx",
      interpreter: "/root/.nvm/versions/node/v16.19.1/bin/npx",
      script: "http-server ./ -p 20202",
    },
    {
      name: "little-project-server",
      script: "./index.js",
    },
  ],
};
