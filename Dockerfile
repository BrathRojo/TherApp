# Usa una imagen base de Node.js para construir Angular
FROM node:18-alpine AS build

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend
COPY . .

# Instala dependencias y construye la aplicación
RUN npm install && npm run build --configuration=production

# Usa Nginx para servir Angular
FROM nginx:alpine

# Copia la aplicación Angular al directorio de Nginx
COPY --from=build /app/dist/ther-app /usr/share/nginx/html

# Expone el puerto donde corre Nginx
EXPOSE 80