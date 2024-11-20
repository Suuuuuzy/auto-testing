# Start from a base image with X11 and Node.js
FROM ubuntu:16.04

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/New_York

# Install necessary packages
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    unzip \
    nodejs \
    npm \
    x11-apps \
    libgtk-3-dev \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

COPY ./libs/libcapnp-0.5.3.so /usr/lib/x86_64-linux-gnu/
COPY ./libs/libkj-0.5.3.so /usr/lib/x86_64-linux-gnu/

COPY ./wechat-devtools-config-deprecated /root/.config/wechat-devtools

RUN apt update && apt install -y vim net-tools lsof

# Add deadsnakes PPA for Python 3.8 and install Python 3.8 and pip
RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update && \
    apt-get install -y python3.8 python3.8-distutils && \
    curl -sS https://bootstrap.pypa.io/get-pip.py | python3.8


# Copy run script for starting taint analysis
COPY ./run /run

# Define volumes for dynamic mounts
VOLUME ["/app"]
VOLUME ["/output"]

# Set the display environment variable to use host's X11
ENV DISPLAY=:99

# Start Xvfb for virtual display
RUN Xvfb :99 -screen 0 1920x1080x24 &

# Set entrypoint
WORKDIR /run
# CMD ["/bin/bash", "/run/entrypoint.sh"]
CMD [ "/bin/bash" ]