docker build -t agile-toggle-mkdocs:v0_0_1 .
docker run -dp 8000:8000 agile-toggle-mkdocs:v0_0_1
docker tag agile-toggle-mkdocs:v0_0_1 agiletoggle.azurecr.io/agile-toggle-mkdocs:v0_0_1
docker push agiletoggle.azurecr.io/agile-toggle-mkdocs:v0_0_1



az aks update -n agiletoggle -g feature-flags-cn --attach-acr agiletoggle

az acr list --resource-group feature-flags-cn --query "[].{acrLoginServer:loginServer}" --output table
az aks get-credentials --resource-group feature-flags-cn --name agiletoggle

kubectl apply -f kubernetes.yaml
kubectl get service agile-toggle-mkdocs --watch
kubectl get service agile-toggle-redis --watch
