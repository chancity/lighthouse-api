FROM node:10.16.3

# Create app directory
WORKDIR /app

RUN apt-get update && \
    apt-get install -y --allow-unauthenticated xsel

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

# Copy all local files into the image.
COPY . .

RUN yarn install

CMD [ "node", "-r", "esm", "./scripts/index.js" ]
