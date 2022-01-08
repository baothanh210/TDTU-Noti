# TDTU-Noti
Đường dẫn đến trang web:
https://tdtu-noti.herokuapp.com/

Code dùng để deploy heroku:
https://github.com/baothanh210/TDTU-Noti

Các tài khoản:
- Admin:
ID: admin@gmail.com
PWD: admin123

- Khoa CNTT (do admin tạo)
ID: cntt@gmail.com
PWD: 123456

- Phòng CTHSSV (do admin tạo)
ID: cthssv@gmail.com
PWD: 123456

- Tài khoản của sinh viên: Dùng Google Sign-in (gmail Trường cấp)

Cách sử dụng project trên localhost:
Thêm các file json trong folder 'database_json' vào MongoCompass
Mở folder TDTU-Noti trong VSCode (hoặc tùy phần mềm biên dịch của người dùng)
Trong Terminal dùng lệnh: npm start
Bấm vào link localhost:8080 đã hiển thị

Chức năng: Tạo tài khoản cho Phòng/Khoa
- Đăng nhập bằng tài khoản Admin
- Nhấn vào avatar của Admin -> Create F/D Account
- Tạo tài khoản cho Phòng/Khoa

Chức năng: Sinh viên thay đổi thông tin cá nhân
- Đăng nhập bằng tài khoản Sinh viên
- Nhấn vào avatar của Sinh viên -> Edit Profile
- Đổi thông tin: Tên hiển thị, Lớp, Khoa

Chức năng: Phòng/Khoa đổi mật khẩu
- Đăng nhập bằng tài khoản Phòng/Khoa
- Nhấn vào avatar của Phòng/Khoa-> Edit Profile
- Đổi mật khẩu

Chức năng: Đăng/Xóa bài
- Đăng nhập bằng 1 tài khoản (Admin, tài khoản Phòng/Khoa đã tạo, tài khoản SV)
- Nhấn vào avatar của user -> My Profile
- Nhấn vào phần SHARE
- Điền thông tin của bài đăng
- Nhấn POST (bài đăng sẽ được sử dụng Ajax để đăng bài)

Chức năng: Hiển thị bài biết dưới dạng timeline
- Đăng nhập bằng 1 tài khoản (Admin, tài khoản Phòng/Khoa đã tạo, tài khoản SV)
- Xem Trang chủ

Chức năng: Coi tất cả thông báo
- Đăng nhập bằng 1 tài khoản (Admin, tài khoản Phòng/Khoa đã tạo, tài khoản SV)
- Xem Thông báo
- Lọc bằng các tag Phòng/ Khoa
- Nhấn vào một thông báo bất kì để xem chi tiết

Chức năng: Coi tất cả bài viết của một user bất kì
- Đăng nhập bằng 1 tài khoản (Admin, tài khoản Phòng/Khoa đã tạo, tài khoản SV)
- Xem Danh sách
- Lọc bằng các tag Phòng/ Khoa/ Sinh viên
- Nhấn vào một tên user bất kì

Chức năng: Xem danh sách tất cả User
- Đăng nhập bằng 1 tài khoản (Admin, tài khoản Phòng/Khoa đã tạo, tài khoản SV)
- Nhấn vào một tên user bất kì

Chức năng (không làm):
Sửa bài đăng
Comment bài đăng
Đăng thông báo real-time






