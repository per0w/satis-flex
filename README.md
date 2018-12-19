![omg](https://media.giphy.com/media/JsQpcSU2l5NdK/giphy.gif)

# Satis and Symfony Flex

`Satis` is a simple static Composer repository generator. \
`Symfony Flex` helps developers create Symfony applications, from the most simple micro-style projects to the more complex ones with dozens of dependencies.

### Usefull:

- [satis](https://github.com/composer/satis)
- [flex](https://github.com/moay/symfony-flex-server)
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com)

## Run:

Pull the image:

```sh
docker-compose pull
```

> Note: by default it will look for a configuration file named `satis.json` inside the `/www/satis/satis.json` directory and dump the generated output files in `/www/satis/html`.

## Updating:

You are running Satis as a Docker container, simply pull the latest image.

## Satis:

If you choose to archive packages as part of your build, over time you can be
left with useless files. With the `purge` command, you can delete these files.

```sh
php bin/satis purge <configuration-file> <output-dir>
```

> Note: don't do this unless you are certain your projects no longer reference any of these archives in their `composer.lock` files.

## Flex:

In order to download your recipes:

```sh
php bin/console recipes:initialize
```

You can use the command to refresh the recipes:

```sh
php bin/console recipes:update
```

> Note: Or you can to automate the process, a webhook is provided. Use the url https://example.com/webhook/update to have the flex server update the repos.

# Satis updater for Bitbucket server [v3.0.0]

Simple tool for updating the Satis configuration (satis.json) "require" key on the basis of the project composer.json.

## Main packages:

- [dotenv](https://www.npmjs.com/package/dotenv)
- [axios](https://www.npmjs.com/package/axios)

## Settings:

Before start app, you should create file: `.env`

```
# Bitbucket
username=*****
password=*****
```

## Use:

```sh
# Install dependencies
yarn install
```

```sh
# Run lint
yarn lint
```

```sh
# Fix lint errors
yarn lint:fix
```

```sh
# Run app
yarn satis:run
```

### Todo:

1. Unit Tests
