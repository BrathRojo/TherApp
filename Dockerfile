# Usa Node.js para construir Angular
FROM node:18 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto y compila Angular
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código fuente y construye la aplicación
COPY . .
RUN npm run build --prod

# Usa Nginx para servir la aplicación Angular
FROM nginx:alpine
COPY --from=build /app/dist/ther-app /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80
