FROM node:14.17.6

RUN userdel node

ARG UID
RUN useradd --non-unique --uid $UID --create-home user
USER user

WORKDIR /usr/src/project/frontend

ENV PATH="/usr/src/project/frontend/node_modules/.bin:${PATH}"

CMD ["yarn", "start"]
