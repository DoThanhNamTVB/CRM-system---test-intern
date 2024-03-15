# Bài test intern thực tập sinh nodejs

-   Xây dựng hệ thống CRM với các task : quản lý khách hàng và sản phẩm.
-   Tích hợp Admin-bro vào ứng dụng Node.js để cung cấp giao diện quản trị.

# Công nghệ sử dụng

-   Nodejs, express, mongodb, mongoose, express-validator
-   JWT, Linter & Formater (pretier, eslint, pre-hook (pre-commit): husky, lint-stage)
-   Admin-bro

# Hướng dẫn cài đặt và sử dụng

1. Clone github : git clone https://github.com/DoThanhNamTVB/CRM-system---test-intern
2. Chạy lệnh : npm i
3. Thiết lập file môi trường .env theo mẫu file .env-example
4. Sử dụng các lệnh có sẵn để thực thi code : npm run dev / npm run server
5. Hoàn thành cài đặt, sử dụng các end-point để truy cập api để sử dụng
6. Truy cập giao diện quản trị thông qua đường dẫn /admin và thử nghiệm việc quản lý dữ liệu khách hàng và sản phẩm.

# Cách cài đặt và sử dụng linter formater

tạo git init (nếu chưa có)
step 0: run cli : npm i
step 1: run cli : npm run prepare
step 2: run cli : npx husky add .husky/pre-commit "npx lint-staged"
step 3: completed. You can check with cli:
check formatter : run cli -> npm run format
check linter : run cli -> npm run fix
check pre-commit : Tự động linter formater khi commit
