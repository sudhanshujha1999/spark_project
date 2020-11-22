#! /bin/bash
export PROJECT_ID=spark-esport
docker build -t shaunwa/spark-esports:latest .
gcloud auth configure-docker
docker push shaunwa/spark-esports:latest