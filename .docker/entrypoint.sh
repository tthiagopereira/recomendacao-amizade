#!/bin/bash

npm install
npm run build
npm test:cov
npm run start:dev