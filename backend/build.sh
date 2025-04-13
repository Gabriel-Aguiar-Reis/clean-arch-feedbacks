#!/usr/bin/env bash
set -e  # Faz o script parar se algum comando falhar

# Garante que yarn está instalado globalmente (evite instalar toda vez)
if ! command -v yarn &> /dev/null; then
  echo "Yarn não encontrado. Instalando..."
  npm install -g yarn
fi

# Instala dependências
yarn install

# Build do projeto
yarn build

# Roda as migrations do TypeORM
yarn prod:migration:run