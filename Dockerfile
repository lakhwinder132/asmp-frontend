# # Use the official Node.js image as base
# FROM node:20.0.0 as build

# # Create and set the working directory
# WORKDIR /frontend_asmp_mentee

# # Copy package.json to the container
# COPY package.json /frontend_asmp_mentee/

# # Install dependencies
# RUN yarn install

# # Copy the frontend project files to the container
# COPY . /frontend_asmp_mentee/

# # Build the frontend app
# RUN yarn build

# # Use a lightweight web server to serve the built frontend app
# RUN yarn global add serve

# # Command to serve the built app
# CMD ["serve", "-s", "dist", "-l", "5010", "--single"]

# Stage 1: Build
FROM node:20.0.0 as build
WORKDIR /frontend_asmp_mentee
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Serve
FROM node:20.0.0
WORKDIR /frontend_asmp_mentee
COPY --from=build /frontend_asmp_mentee/dist ./dist
RUN yarn global add serve
CMD ["serve", "-s", "dist", "-l", "5010", "--single"]