# Node.js Application

## Description

This is a simple Node.js application. It is containerized using Docker and deployed on Kubernetes with continuous integration and delivery (CI/CD) setup through GitHub Actions and followed up by ArgoCD

## Prerequisites

To run this project locally, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Docker](https://www.docker.com/get-started) (for containerizing the app)
- [Kubernetes](https://kubernetes.io/docs/setup/) (for deploying to a Kubernetes cluster, optional)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) (to manage Kubernetes resources)

## Cloning the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/BOOPESH-foxy/kube-nodejs.git
cd kube-nodejs
```
Install the necessary Node.js dependencies by running the following command:
```bash
npm install
```
Once dependencies are installed, start the Node.js application locally:
```bash
npm start
```
The application will be running at http://localhost:3000.
## Docker setup
If you want to run the application inside a Docker container, you can build and run the Docker image:

Build the Docker Image:
```bash
docker build -t node-app .
```
Run the Docker Container:
```bash
docker run -p 3000:3000 node-app
```
The application will be running at http://localhost:3000 inside the Docker container.

## CI/CD - Github Actions / workflows
Whenever changes are pushed to the `main` branch or a `pull request` is made, the following steps are automatically triggered:

1. **Test Stage**:
   - The pipeline runs unit tests to ensure that the application is functioning correctly.
   - If any tests fail, the pipeline stops, and the changes are not deployed.

2. **Build Stage**:
   - The application is built into a Docker image. The image is tagged with a version number (e.g., `1.0.0`, `1.1.0`, etc.) to ensure versioning     
     consistency.
   - The Docker image is pushed to Docker Hub using the credentials stored in the GitHub Secrets (`DOCKER_USERNAME` and `DOCKER_PASSWORD`).

3. **Deploy Stage**:
   - Once the image is pushed to Docker Hub, the application is deployed to the Kubernetes cluster.
   - Kubernetes Deployment and Service configurations are applied, ensuring that the application is always running with the latest Docker image.

4. **Notifications**:
   - After each deployment, the pipeline sends notifications to inform the team about whether the deployment was successful or if any errors occurred.


For the CI/CD pipeline to work correctly, 
the following secrets need to be configured in your GitHub repository:

DOCKER_USERNAME: Your Docker Hub username.
DOCKER_PASSWORD: Your Docker Hub password.
# Monitor the Pipeline
You can monitor the progress of the pipeline by navigating to the Actions tab in your GitHub repository. Here, you can see the status of each job and whether any errors occurred during the execution of the pipeline.


## Kube setup
To deploy the application on Kubernetes, you need to have a running Kubernetes cluster.

Deploy the Application: Create the necessary Kubernetes deployment and service using the following command:
```bash
kubectl apply -f k8s/
```
This will apply the deployment.yaml and service.yaml files from the k8s/ directory.
Access the Application: Once the deployment is successful, you can access the application based on your cluster's configuration.

## Installing ArgoCD
1. We will start with launching minikube cluster.
```bash
minikube start --driver=docker
```
2. Create a namespace for argocd
```bash
kubectl create namespace argocd
```
3. Apply ArgoCD manifest installation file from ArgoCD [github repository](https://github.com/argoproj/argo-cd/releases) 
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.8.4/manifests/install.yaml
```
4. Verify the installation by getting all the objects in the ArgoCD namespace.
```bash
kubectl get all -n argocd
```
5. wait till all pods in that namespace running

# Access ArgoCD UI
1. we need to do a port forwarding from the argocd-server service
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```
2. now lets go to browser with http://localhost:8080
3. retrieve password from secret in argocd namespace
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```
4. the default login username is ```admin``` with the password we took above
5. Once logged in configure your repo link and namespaces that you created on kube
6. After that apply the configuration and you'll see an app created and check for the sync and status.
   
