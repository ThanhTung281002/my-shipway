# LOG 


## 22/01/2026 01h14am 
- [ ] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm UI động cho scan drivers services. 
- Làm các trạng thái của của trang web. 

### Đã làm
- Đã xử lí xong toàn bộ hành vi chính của giao diện động. 


### Đang kẹt / dở
- Chưa có trạng thái đang load trang, đang poll kết quả tìm kiếm tài xế. 

### Hướng làm tiếp
- Tăng thời gian chờ của api và thời gian scan để làm các trạng thái của trang web. 

---



## 21/01/2026 19h02
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm UI động cho scan drivers services.

### Đã làm
- Đã làm hành vi load drivers details. 

### Đang kẹt / dở
- Cần làm gọn lại các phần mà chưa cần dùng đến lúc này như state, và nhìn nhận lại đúng về biến trạng thái state của mỗi trang web thì dùng để làm gì. Và sửa code lại cho đúng ở tầng controller và các tầng còn lại mà có sử dụng state. 

### Hướng làm tiếp
1. Dọn sạch các code liên quan đến state trang web mà chưa cần tới bây giờ. 
2. Sử dụng state lại cho đúng trong tầng controller. 

---

## 21/01/2026 18h11 

- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm giao diện động cho UI. 

### Đã làm
- Đã làm load cho thông tin đơn hàng. 

### Đang kẹt / dở
- Mình nói nè, đó là phần mà loading hay state chờ thì sẽ để sau, làm hành vi trước. Vì bị lấn vào nhiều cái cùng một lúc nên Tùng bị đơ ra vì nhiều cái phải làm một lúc. 
- Set delay tất cả bằng 0. 

### Hướng làm tiếp
- Để coi đang làm tới đâu rồi 

---


## 20/01/2026 16h51
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: làm giao diện động cho website scan drivers. 

### Đã làm
- Đã hoàn thành, ở file `frontend/src/pages/scan-drivers/index.html`
- Đã hoàn thành giao diện tĩnh. Gồm các thành phần cần có trong website, spacing cơ bản. 

### Đang kẹt / dở

### Hướng làm tiếp
- Làm giao diện động bằng việc lập trình js ở file `frontend/src/pages/scan-drivers/scan-page.js`

---


## 20/01/2026 11h02 am 
- [x] Hoàn thành 

### Context
- Mục tiêu: làm giao diện FE tĩnh. 
- Đang làm ở file frontend/src/pages/scan-drivers/index.html

### Đã làm
- Thiết kế BE mock với logic ổn định và mock data hợp lí cho FE sử dụng. 

### Đang kẹt / dở
- Làm giao diện tĩnh cho FE từ trang figma đã tạo. 

### Hướng làm tiếp
- Làm giao diện tĩnh. 


---

## 19/01/2026 7h23pm 
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: thiết kế BE từ mock lên đúng mức độ yêu cầu. 
- File đang làm: main.py


### Đã làm
- Đã làm logic cơ bản cho 3 api cần sử dụng trong này, đó là gửi gì và nhận lại gì, ở mức cơ bản và sử dụng mock database. 
- Mức độ hiện tại: get result và trả lại found và list drivers sau khi tìm kiếm một mốc thời gian, sử dụng mock database FAKE_DRIVERS. 
- Các thông số của object driver đều được định sẵn trước. 

### Đang kẹt / dở
- Lúc confirm thì phải xét xem thử có driver nào có id trùng với trong request không? Nếu không thì trả no driver found. 


### Hướng làm tiếp
- Hỏi chatGPT về mức độ của hệ thống BE, có cần nâng lên nữa không trước khi chuyển sang FE, mình nghĩ là có, vì chưa đúng logic cơ bản là gửi booking id cũng như toàn bộ các thông tin khác để tính toán các thông số bên driver. Và sau đó sẽ gửi lại toàn bộ các thông tin đó để bên FE hiển thị ra. 
> Note của mình để gửi cho chatGPT: 
> mình nhớ lại là trong hệ thống mà bên công ty kêu thì có yêu cầu là: 
Tìm ra 5 lựa chọn tối ưu nhất cho tài xế theo các tiêu chí (ví dụ như khoảng cách đến điểm lấy hàng, giá cước thương lượng - phần này mình chưa rõ). 
Nên mình nghĩ là khả năng cao là bên BE sẽ gửi đi cho các tài xế và sau đó thì nhận lại các đồng ý và sau đó sẽ lọc ra 5 yêu cầu tối ưu và thời gian để làm việc đó là trong bao nhiêu phút đó. Vậy là vẫn theo cách FE polling đúng không? 
Và chủ hàng có quyền ấn nút tìm kiếm lại. Vậy là có thêm api /scan-drivers/rescan không? 



---

## 19/01/2026 4h04 pm 
- [x] Hoàn thành 

### Context
- Mục tiêu hiện tại: Lập trình api cho BE gồm có 3 api như trong file README.md



### Đã làm
- hầu như chưa làm gì. 

### Đang kẹt / dở
- Chưa hình dung code sẽ như thế nào. 


### Hướng làm tiếp
- Làm theo sự hướng dẫn của chatGPT nhưng mình là người làm chính, nó chỉ có việc hướng dẫn thôi, chỉ đưa code ví dụ. 

---








## Ngày giờ
- [ ] Hoàn thành 

### Context

### Đã làm

### Đang kẹt / dở

### Hướng làm tiếp

---