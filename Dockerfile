# build environment
FROM node:14 as build
WORKDIR /app
COPY . .
RUN yarn install && yarn build
# production environment
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]