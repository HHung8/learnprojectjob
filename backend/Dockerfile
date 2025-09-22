# Dùng Node.js image chính thức
FROM node:18

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package.json trước để tối ưu cache
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port backend
EXPOSE 3002

# Chạy server
CMD ["npm", "start"]
