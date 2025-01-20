FROM node:20-bullseye

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    binutils \
    xz-utils \
    # --------------------------------------------------
    # Required for Chrome Installation
    # --------------------------------------------------
    libnss3 \
    libnspr4 \
    libglib2.0-0 \
    libgconf-2-4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libgbm1 \
    libxss1 \
    libasound2 \
    # ------------------------------------
    # Additional Dependencies
    # ------------------------------------
    libdbus-1-3 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libpango-1.0-0 \
    libcairo2 \
    at-spi2-core \
    # ------------------------------------
    # X11 and Font Dependencies
    # ------------------------------------
    xvfb \
    fonts-liberation \
    libu2f-udev \
    xdg-utils \
    # --------------------------------------------------
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

CMD ["/bin/bash"]
