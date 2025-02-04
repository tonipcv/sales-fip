# Imagem base
FROM node:18-alpine AS base
WORKDIR /app

# Camada de dependências
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Camada de build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Camada de produção
FROM base AS runner
ENV NODE_ENV=production

# Cria um usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia arquivos necessários
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Define o usuário correto
USER nextjs

# Expõe a porta
EXPOSE 3000

# Define variáveis de ambiente
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando para iniciar
CMD ["node", "server.js"] 