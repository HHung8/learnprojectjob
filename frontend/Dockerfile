# Chọn image Node chính thức
FROM node:20-alpine AS build

# Tạo thư mục làm việc trong container
WORKDIR /job

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Nhận biến môi trường khi build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy toàn bộ source coce
COPY . .

# Build nếu là dư 
RUN npm run build

# ---------
# State 2: Server bằng Nginx
FROM nginx:alpine

# Copy file build từ stage build sang nginx
COPY --from=build /job/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  

# Expose cổng 
EXPOSE 80

# Khởi động nginx ở foreground (không daemon)
CMD ["nginx", "-g", "daemon off;"]