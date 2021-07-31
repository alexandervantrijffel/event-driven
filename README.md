# event-driven

Event driven data processing demo

### Getting started

To run the demo locally, execute the following commands:

```bash
yarn install
docker-compose up -d broker
yarn lerna run ping-pong
```

Browse the Kafka topics and consumers with [Offset Explorer](https://kafkatool.com). Make sure to set the bootstrap servers field on the advanced tab to `localhost:9092`.

### Example commands for Lerna monorepo

Create ping-pong package

```bash
yarn lerna create @structura/ping-pong
```

Add the latest stable version of typescript to all workspaces

```bash
yarn lerna add typescript@ -E --dev
```

Add dependency package/application-lifecycle to package/ping-pong

```bash
yarn lerna add @grandvision/application-lifecycle --scope=@grandvision/ping-pong
```

Execute all tests that are impacted by the changed compared to origin/master

```bash
yarn lerna run test --concurrency 1 -- --changedSince=origin/master
```

Run yarn install for all workspaces

```bash
yarn install
```

Run yarn upgrade for all workspaces

```bash
yarn lerna exec --concurrency 1 -- yarn upgrade
```

Dry run semantic-release with the semantic-release-monorepo extension

```bash
yarn lerna exec --concurrency 1 -- npx --no-install semantic-release -e semantic-release-monorepo --dry-run
```

Import an existing package into the monorepo including git history

```bash
yarn lerna import ~/projects/my-npm-repo-package-1 — flatten
```
