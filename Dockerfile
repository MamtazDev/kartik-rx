# # Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM tiangolo/node-frontend:10 as build-stage

# WORKDIR /app

# COPY package*.json /app/

# RUN npm install

# COPY ./ /app/

# ARG FRONTEND_ENV=production

# ENV VUE_APP_ENV=${FRONTEND_ENV}

# # Comment out the next line to disable tests
# RUN npm run test:unit

# RUN npm run build


# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# # FROM nginx:1.15
# FROM nginx:1.19.3-alpine

# COPY --from=build-stage /app/dist/ /usr/share/nginx/html

# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf

    
#Run npm build to generate static files
FROM node:16.18 as build
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

# ARG REACT_APP_GA_MEASUREMENT_ID
COPY ./public /app/public
COPY ./package*.json /app/
COPY ./config-overrides.js /app/
COPY ./jsconfig.json /app/jsconfig.json
COPY ./.eslintrc.js /app/.eslintrc.js
COPY ./.env /app/.env
COPY ./src /app/src
# RUN REACT_APP_GA_MEASUREMENT_ID=$REACT_APP_GA_MEASUREMENT_ID npm run build
RUN npm run build


#Build nginx image with static files
FROM nginx:1.19.3-alpine as release
# TODO: enable brotli compression
# FROM fholzer/nginx-brotli:v1.18.0 as release
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
