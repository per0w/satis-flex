FROM php:7.2

LABEL MAINTAINER=""

ENV RELEASE="1.0.1" \
    FLEX_URL=https://github.com/moay/symfony-flex-server/archive/ \
    APP_ENV=dev

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    apt-utils \
    curl \
    wget \
    unzip \
    git \
    nano

RUN wget https://getcomposer.org/download/1.6.5/composer.phar && \
    mv composer.phar /usr/local/bin/composer && \
    chmod +x /usr/local/bin/composer

# install flex-server
RUN wget ${FLEX_URL}${RELEASE}.zip && \
    unzip ${RELEASE}.zip && rm ${RELEASE}.zip && \
    cd symfony-flex-server-${RELEASE} && \
    composer install && rm -rf /root/.composer/cache/*

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 8000

RUN git config --global credential.helper store && \
    echo "https://user:password@bitbucket.server" >> /root/.git-credentials

WORKDIR /symfony-flex-server-${RELEASE}

RUN sed config/services.yaml -i -e "s|recipe_repo_private: https://github.com/moay/demo-recipes|recipe_repo_private: https://bitbucket.server/scm/key/repo.git|g" && \
    bin/console recipes:initialize 

ENTRYPOINT ["bin/console", "server:run", "0.0.0.0"]