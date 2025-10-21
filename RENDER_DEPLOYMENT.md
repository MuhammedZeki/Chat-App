# Render Deployment Rehberi

## 🚀 Render'a Deploy Etme Adımları

### 1. Render Dashboard'a Git

- [render.com](https://render.com) adresine git
- GitHub hesabınla giriş yap

### 2. Yeni Web Service Oluştur

- "New +" butonuna tıkla
- "Web Service" seç
- GitHub repository'ni bağla

### 3. Build ve Deploy Ayarları

```
Build Command: npm run build
Start Command: npm start
```

### 4. Environment Variables Ayarla

Render dashboard'da "Environment" sekmesine git ve şu değişkenleri ekle:

#### Zorunlu Environment Variables:

- `PORT`: 3000 (Render otomatik ayarlar)
- `NODE_ENV`: production
- `MONGODB_URI`: MongoDB Atlas connection string'in
- `JWT_SECRET`: Güçlü bir secret key (en az 32 karakter)
- `CLIENT_URL`: https://your-app-name.onrender.com
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name'in
- `CLOUDINARY_API_KEY`: Cloudinary API key'in
- `CLOUDINARY_API_SECRET`: Cloudinary API secret'in

### 5. MongoDB Atlas Kurulumu

1. [MongoDB Atlas](https://www.mongodb.com/atlas) hesabı oluştur
2. Yeni cluster oluştur
3. Database user oluştur
4. Network access'te 0.0.0.0/0 ekle (tüm IP'lere izin ver)
5. Connection string'i al ve MONGODB_URI olarak ekle

### 6. Cloudinary Kurulumu

1. [Cloudinary](https://cloudinary.com) hesabı oluştur
2. Dashboard'dan API credentials'ları al
3. Environment variables olarak ekle

## ✅ Düzeltilen Sorunlar

1. **Socket.io CORS**: Artık environment variable'dan CLIENT_URL alıyor
2. **Package.json Dependencies**: Gereksiz "chat-app" dependency'leri kaldırıldı
3. **Environment Variables**: Tüm gerekli değişkenler belgelendi

## 🔧 Render'da Olabilecek Sorunlar ve Çözümleri

### Build Hatası

- `npm run build` komutunun çalıştığından emin ol
- Node.js versiyonu 18+ olduğundan emin ol

### Database Bağlantı Hatası

- MongoDB Atlas'ta IP whitelist kontrolü yap
- Connection string'in doğru olduğundan emin ol

### CORS Hatası

- CLIENT_URL environment variable'ının doğru olduğundan emin ol
- URL'nin sonunda "/" olmamasına dikkat et

### Socket.io Bağlantı Hatası

- CLIENT_URL'in HTTPS olduğundan emin ol
- Render'da WebSocket desteği aktif olduğundan emin ol

## 📝 Notlar

- Render free tier'da uygulama 15 dakika idle kalırsa sleep moduna geçer
- İlk açılış biraz yavaş olabilir (cold start)
- Production'da console.log'ları minimize et
- Error handling'i güçlendir
