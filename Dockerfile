# 1. Altyapı: Node.js 22 (Son sürüm, senin projeye uygun)
FROM node:22-alpine

# 2. Çalışma klasörünü ayarla
WORKDIR /app

# 3. Önce bağımlılık listesini kopyala (Cache performansı için)
COPY package*.json ./

# 4. Bağımlılıkları indir
RUN npm install

# 5. Kalan tüm proje dosyalarını kopyala
COPY . .

# 6. Vite'ın varsayılan portu
EXPOSE 5173

# 7. Uygulamayı başlat (--host parametresi Docker dışından erişim için şart!)
CMD ["npm", "run", "dev", "--", "--host"]