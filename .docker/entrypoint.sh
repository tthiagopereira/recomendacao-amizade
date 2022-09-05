#!/bin/bash

npm install
npm run build
npm run test:cov
npm run start:dev