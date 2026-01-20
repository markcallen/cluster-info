# Cluster Info Demo

Cluster Info is a small demo application that proves a Kubernetes Deployment,
Service, and Gateway (or Ingress) are wired correctly. It uses:

- Vite + React + Tailwind CSS for the frontend
- Express for the backend
- A simple `/api/info` endpoint that exposes pod and cluster identity
- A Docker image intended to be deployed via Argo CD

This is ideal for cluster smoke tests, Gateway API examples, and Everyday DevOps
style walkthroughs.

## Prerequisites

- Node.js 22+ (use [nvm](https://github.com/nvm-sh/nvm) to install and manage Node.js versions)
- npm (or your preferred package manager)
- Docker (for container builds)
- A Kubernetes cluster (kind, k3s, GKE, etc.) for deployment
- Optional: Argo CD installed in the `argocd` namespace

## Local development

Setup node:

```bash
nvm install
```

Install dependencies:

```bash
npm install
```

Run the Vite dev server:

```bash
npm run dev
```

This starts the dev server on the default Vite port (usually `5173`). The dev
build proxies API calls to `/api/info` if you configure a dev proxy, but for
this demo the API is primarily served by the Express backend in production mode.

To build the production assets and start the Express server locally:

```bash
npm run build
npm run start
```

Then open:

```text
http://localhost:3000
```

You can simulate Kubernetes metadata with environment variables:

```bash
POD_NAME=local-pod POD_NAMESPACE=local-namespace NODE_NAME=local-node CLUSTER_NAME=local-cluster APP_VERSION=0.1.0 npm run start
```

## Docker usage

Build the image:

```bash
docker build -t cluster-info:local .
```

Run the container:

```bash
docker run --rm -p 3000:3000   -e POD_NAME=local-pod   -e POD_NAMESPACE=local-namespace   -e NODE_NAME=local-node   -e CLUSTER_NAME=local-cluster   -e APP_VERSION=0.1.0   cluster-info:local
```

Visit `http://localhost:3000` to see the UI and pod identity details.

## Kubernetes deployment

The repository includes a basic Deployment and Service manifest in
`k8s/manifests/cluster-info.yaml`.

Apply it directly:

```bash
kubectl apply -n cluster-info -f k8s/manifests/cluster-info.yaml
```

If the namespace does not exist yet:

```bash
kubectl create namespace cluster-info
kubectl apply -n cluster-info -f k8s/manifests/cluster-info.yaml
```

Once deployed, expose the Service using your chosen method:

- Gateway API (HTTPRoute)
- Ingress
- `kubectl port-forward`
- LoadBalancer Service

You should then be able to reach the app and see real pod, namespace, and node
values from the cluster.

## Argo CD deployment

The `k8s/argocd/app-cluster-info.yaml` file defines an Argo CD Application that
automates deployment from this repository.

Update the `repoURL` and `targetRevision` to match your Git repository:

```yaml
source:
  repoURL: https://github.com/YOUR_ORG/cluster-info.git
  targetRevision: main
  path: k8s/manifests
```

Apply the Argo CD Application:

```bash
kubectl apply -f k8s/argocd/app-cluster-info.yaml
```

Argo CD will:

- Create the `cluster-info` namespace (via `CreateNamespace=true`)
- Sync the Deployment and Service from `k8s/manifests`
- Keep them up to date on future commits

## GitHub Actions and Docker Hub

The repository contains a workflow in
`.github/workflows/docker-build-and-push.yml` that:

- Builds the Docker image on every push to `main`
- Builds and pushes the image to Docker Hub when a semver-like tag is pushed
  (for example `v1.0.0`)

### Setup steps

1. Create the following GitHub Actions secrets:
   - `DOCKERHUB_USERNAME` – your Docker Hub username
   - `DOCKERHUB_TOKEN` – a Docker Hub access token or password

2. Optionally adjust the `IMAGE_NAME` in the workflow environment if you want a
   different image name.

3. Push a tag:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

The workflow will build and publish:

- `docker.io/<DOCKERHUB_USERNAME>/cluster-info:v1.0.0`
- `docker.io/<DOCKERHUB_USERNAME>/cluster-info:latest`

Update the Kubernetes manifests to reference this image:

```yaml
image: docker.io/<DOCKERHUB_USERNAME>/cluster-info:latest
```

or pin to a specific tag:

```yaml
image: docker.io/<DOCKERHUB_USERNAME>/cluster-info:v1.0.0
```

## Folder structure

```text
cluster-info/
  Dockerfile
  package.json
  tsconfig.json
  vite.config.mts
  tailwind.config.cjs
  postcss.config.cjs
  index.html
  src/
    main.tsx
    App.tsx
    index.css
  server/
    index.mjs
  k8s/
    manifests/
      cluster-info.yaml
    argocd/
      app-cluster-info.yaml
  .github/
    workflows/
      docker-build-and-push.yml
  README.md
```

This repository is ready to be initialized with git and pushed to a remote:

```bash
git init
git add .
git commit -m "Initial commit for cluster-info demo"
git remote add origin git@github.com:YOUR_ORG/cluster-info.git
git push -u origin main
```
