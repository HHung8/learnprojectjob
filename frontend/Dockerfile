# Chọn image Node chính thức
FROM node:20-alpine AS build

# Tạo thư mục làm việc trong container
WORKDIR /job

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source coce
COPY . .

# Build nếu là dư 
RUN npm run build

# ---------
# State 2: Server bằng Nginx
FROM nginx:alpine

# Copy file build từ stage build sang nginx
COPY --from=build /job/dist /usr/share/nginx/html

# Expose cổng 
EXPOSE 80

# Khởi động nginx ở foreground (không daemon)
CMD ["nginx", "-g", "daemon off;"]