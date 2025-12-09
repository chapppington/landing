import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Пустой turbopack конфиг для совместимости с webpack настройками
  turbopack: {},
  
  // Включаем hot reload в Docker для webpack (если используется --webpack флаг)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Проверка изменений каждую секунду
        aggregateTimeout: 300, // Задержка перед перезагрузкой
      };
    }
    return config;
  },
};

export default nextConfig;
