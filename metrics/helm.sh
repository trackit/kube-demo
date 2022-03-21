#!/usr/bin/env bash

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus --namespace metrics prometheus-community/prometheus -f ./config/prometheus.yml
helm install prometheus-adapter --namespace metrics prometheus-community/prometheus-adapter -f ./config/adapter.yml
