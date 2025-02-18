FROM node:18

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install --global corepack@latest && pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
