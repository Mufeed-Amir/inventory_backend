# Use an official Node.js runtime as a parent image
FROM node:18

WORKDIR /app/
COPY . /app/


ENV NODE_OPTIONS="--max-old-space-size=8192"

# Install app dependencies such as chromium driver and other env sopporting tools
RUN apt-get update \
 && apt-get install -y chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends

RUN npm install

ENTRYPOINT [ "npm", "start" ]

