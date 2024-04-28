# Todo App





### Apps and Packages

- `web`:  [Next.js](https://nextjs.org/) app
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting


### Enviornment Viariables

Backend
```
cd todo
cd apps/api/
mkdir .env
# copy below content
SECRET=
HOST=
PORT=
PASSWORD=
USERNAME=
DATABASE=
```
Frontend
```
cd todo
cd apps/web/
mkdir .env.locaal

#copy below content
NEXT_PUBLIC_API_ROUTE="http://localhost:5001"


```


### To run 

To run the app, run the following command:

```
cd todo
pnpm install
pnpm run dev
```



### Major Routes
SignIn http://localhost:3000/
SignUp http://localhost:3000/
Homepage http://localhost:3000/home
Each Project view page http://localhost:3000/view?id=1

