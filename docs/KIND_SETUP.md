# IssueHub Setup Guide on Kind

This guide explains how to set up the IssueHub application and MySQL database using [Kind (Kubernetes in Docker)](https://kind.sigs.k8s.io/), a local Kubernetes environment.

## 1. Prerequisites

Please ensure the following tools are installed:

- **Docker**: Container runtime
- **Kind**: Tool for running local Kubernetes clusters
- **Kubectl**: Kubernetes CLI tool
- **Helm**: Package manager for Kubernetes

## 2. Creating a Kind Cluster

First, create a local Kubernetes cluster.

```bash
kind create cluster --name issuehub-cluster
```

Verify that the cluster has been created successfully.

```bash
kubectl cluster-info --context kind-issuehub-cluster
```

## 3. Deploying MySQL Database

Deploy MySQL using the official MySQL image manifest.

```bash
kubectl apply -f k8s/mysql.yaml
```

Wait for MySQL to start up.

```bash
kubectl rollout status deployment/mysql
```

## 4. Building and Loading the Application

Create two images: one for the application (lightweight) and one for migration (including tools), and load them into the Kind cluster.

```bash
# 1. Build and load the application image
docker build -t issuehub:local .
kind load docker-image issuehub:local --name issuehub-cluster

# 2. Build and load the migration image (using the builder stage)
docker build --target builder -t issuehub:migrate .
kind load docker-image issuehub:migrate --name issuehub-cluster
```

## 5. Database Migration

Create the database schema using the migration image.
This image includes development tools such as the `prisma` CLI.

```bash
# Run a temporary Pod for migration (using the issuehub:migrate image)
kubectl run migrate-job --rm -it --restart=Never \
  --image=issuehub:migrate \
  --env="DATABASE_URL=mysql://issuehub:password@mysql:3306/issuehub" \
  --command -- ./node_modules/.bin/prisma migrate deploy
```

If successful, you will see `Datasource "db": MySQL database "issuehub" at "mysql:3306"` and `No pending migrations to apply.` (or logs indicating migrations were applied).

## 6. Deploying the Application

Deploy IssueHub using the Helm chart created.
Replace the Github API Token and other environment variables with your actual values.

```bash
# Build dependencies (just in case)
helm dependency build ./charts/issuehub

# Install the application
helm install issuehub ./charts/issuehub \
  --set image.repository=issuehub \
  --set image.tag=local \
  --set image.pullPolicy=Never \
  --set secret.data.databaseUrl="mysql://issuehub:password@mysql:3306/issuehub" \
  --set secret.data.githubApiToken="YOUR_GITHUB_TOKEN_HERE" \
  --set secret.data.nextAuthSecret="super-secret-random-string" \
  --set secret.data.nextAuthUrl="http://localhost:8080"
```

> **Note:** `image.pullPolicy=Never` is required. This tells Kind to use the local image loaded earlier instead of trying to pull from Docker Hub.

## 7. Verification

Wait for the application to start.

```bash
kubectl rollout status deployment/issuehub
```

Set up port forwarding to access the application from your local browser.

```bash
# Forward local port 8080 to the IssueHub service
kubectl port-forward service/issuehub 8080:80
```

Access [http://localhost:8080](http://localhost:8080) in your browser.

## 8. Cleanup

When finished, delete the cluster to release resources.

```bash
kind delete cluster --name issuehub-cluster
```