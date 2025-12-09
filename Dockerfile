FROM node:22-alpine

# Устанавливаем pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт для Next.js
EXPOSE 3000

# Запускаем в режиме разработки с hot reload
CMD ["pnpm", "dev"]

