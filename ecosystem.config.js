module.exports = {
    apps : [
      {
        name: "nextjslocale",
        watch: true,
        script: "./node_modules/next/dist/bin/next",
        args: "start -p 3000",
        env: {
          "NODE_ENV": "development"
        },
        env_production : {
          "NODE_ENV": "production"
        }
      }
    ]
};