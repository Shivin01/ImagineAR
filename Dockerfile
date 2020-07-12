FROM python:3.6

RUN set -ex && \
    curl -sL https://deb.nodesource.com/setup_12.x  | bash -  && \
    (echo "Package: *" && echo "Pin: origin deb.nodesource.com" && echo "Pin-Priority: 600") > /etc/apt/preferences.d/nodesource  && \
    apt-get update && \
    apt-get -y install nodejs \
    openjdk-11-jdk \
    librdkafka-dev \
    supervisor \
    nginx \
    vim \
    postgresql-client-11 \
    redis-server \
    gettext-base && \
    npm i -g npm@^6  && \
    echo "JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/" >> /etc/environment  && \
    . /etc/environment

WORKDIR /hackathon

COPY . .

RUN /usr/local/bin/pip3.6 install -r ./ImagineAR/requirements.txt

WORKDIR /hackathon/ImagineAR/camera/react_frontend
RUN npm install

ENV PYTHONUNBUFFERED 1

WORKDIR /hackathon
COPY ./supervisor-config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
