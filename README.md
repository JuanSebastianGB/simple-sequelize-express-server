### Starting sequelize project

```bash

npx sequelize-cli init

```

### Create database

```bash
npx sequelize-cli db:create
```

### Create model for category

```bash
npx sequelize-cli model:generate --name Category --attributes description:string
```

### Create model for product

```bash
npx sequelize-cli model:generate --name Product --attributes description:string,categoryId:integer
```

### Execute migrations

```bash
npx sequelize-cli db:migrate
```
