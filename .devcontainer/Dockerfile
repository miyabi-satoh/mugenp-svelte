FROM node:20-bookworm-slim

RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git openssh-client zsh curl ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && chsh -s /bin/zsh node \
    && npm install -g pnpm

USER node
WORKDIR /app

RUN mkdir node_modules

RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
    && pnpm config set store-dir /home/node/.pnpm-store \
    && echo 'alias ncu="pnpm dlx npm-check-updates"' >> /home/node/.zshrc