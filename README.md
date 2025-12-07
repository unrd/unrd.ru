# unrd.ru

Простой лендинг-заглушка для хаба проектов unrd.ru.

## Описание
Страница представляет собой минималистичную заглушку с полноэкранным фоновым изображением, логотипом по центру и подписью в футере. Включает интерактивный поп-ап с информацией о художнике Ашере Дюране.

## Структура проекта
- `index.html` — Точка входа.
- `index.tsx` — Логика React приложения.
- `App.tsx` — Основной компонент и верстка.
- `index.css` — Стили (Tailwind).
- `tailwind.config.js` — Конфигурация стилей.

## Развертывание на своем сервере (Self-hosted)

### 1. Системные требования
Для сборки и работы статики требования минимальные:
- **CPU**: 1 vCPU
- **RAM**: 512 MB - 1 GB
- **OS**: Ubuntu 20.04 / 22.04 LTS (рекомендуется)
- **Node.js**: Версия **18.x (LTS)** или **20.x (LTS)**
- **Web Server**: Nginx

### 2. Подготовка окружения
Установите Node.js и Nginx:
```bash
# Установка Node.js (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка Nginx
sudo apt update
sudo apt install nginx
```

### 3. Сборка проекта
1. Клонируйте репозиторий или загрузите файлы на сервер (например, в `/var/www/unrd`).
2. Установите зависимости и соберите проект:

```bash
cd /var/www/unrd
npm install
npm run build
```

После этого появится папка `dist` (или `build`), содержащая готовые статические файлы.

### 4. Настройка Nginx
Создайте конфиг для сайта:
`sudo nano /etc/nginx/sites-available/unrd`

Вставьте следующую конфигурацию:

```nginx
server {
    listen 80;
    server_name unrd.ru www.unrd.ru;

    root /var/www/unrd/dist; # Путь к папке со сборкой
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Опционально: Кэширование изображений
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Активируйте сайт и перезагрузите Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/unrd /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```
