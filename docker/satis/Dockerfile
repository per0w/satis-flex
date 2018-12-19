FROM php:7.2

LABEL MAINTAINER=""

ENV RELEASE="1.0.0" \
    SATIS_URL=https://github.com/composer/satis/archive/

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    apt-utils \
    curl \
    wget \
    unzip \
    git \
    nano \ 
    nginx \ 
    ca-certificates \
    supervisor

# Nginx prepere
RUN  mkdir -p /run/nginx \
    && mkdir -p /run/nginx \
    && mkdir -p /var/log/supervisor \
    && mkdir -p /www/satis/html \
    && ln -s /etc/nginx/sites-available/satis.conf /etc/nginx/sites-enabled/satis.conf

COPY ["./conf/nginx.conf", "/etc/nginx/nginx.conf"]
COPY ["./conf/satis.conf", "/etc/nginx/sites-available/"]
COPY ["./conf/supervisor/supervisor.conf", "/etc/supervisord.conf"]

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# Add credentials for git and composer
RUN git config --global credential.helper store && \
    echo "https://user:password@bitbucket-server.com" >> /root/.git-credentials && \
    echo "{\"http-basic\": {\"bitbucket-server.com\": {\"username\": \"user\", \"password\": \"password\"}}}"


RUN composer create-project composer/satis /satis --stability=dev --keep-vcs

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 80 443
WORKDIR /satis

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]