FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY channels.json ./channels.json
COPY src ./src

ENV PORT=8090
ENV FEED_SITE_URL=http://discord-rss:8090
ENV DATA_FILE=/app/data/messages.json
ENV CHANNELS_FILE=/app/channels.json

EXPOSE 8090

CMD ["npm", "start"]
