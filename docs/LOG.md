# LOG 

## 20/01/2026 16h51
- [ ] Hoàn thành 

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