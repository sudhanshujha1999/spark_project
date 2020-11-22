## Deploying a new image:

1. Find out what the current docker image is on the Kubernetes cluster:

`kubectl describe deployment spark-esports-deployment`

(and then look for Containers.spark-esports.Image)

2. Build an updated docker image, bumping the version accordingly:

`docker build -t <image_name>:<new_version> .`

3. Push the new version up to the container registry:

`docker push <image_name>`

4. Update the image running on the Kubernetes cluster:

`kubectl set image deployment/<deployment_name> <container_name>=registry.hub.docker.com/shaunwa/<image_name>:<new_version> --record`

ex: `kubectl set image deployment/spark-esports-deployment spark-esports=registry.hub.docker.com/shaunwa/spark-esports:0.3 --record`

5. Profit