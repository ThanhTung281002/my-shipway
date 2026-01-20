# Scan driver (Backend)

Service scan driver cho epic đặt gửi hàng. Ở dưới thông tin chủ yếu cho phần logic chính (Backend). 

## Cách chạy 
Cần có python3 và pip tải sẵn. Cần ở trong thư mục `my-shipway` để chạy các lệnh ở dưới, gõ `pwd`(print working directory) để kiểm tra đang ở thư mục nào. 


1. Chạy môi trường ảo venv `source venv/bin/activate`
2. Tải các module cần thiết `pip install -r requirement.txt`
3. Chạy bằng cách `uvicorn app.main:app --reload` 

## Cấu trúc file cho cả dự án microservice 
### Toàn dự án microservices
> Note: 
> Để học cách hình dung về microservice 

poem-delivery-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/        # gọi API (fetch)
│   │   └── main.js
│   └── index.html
│
├── services/
│   ├── scan-driver/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── routers/
│   │   │   │   └── scan.py
│   │   │   ├── models/
│   │   │   ├── mock_db/
│   │   │   │   └── scans.py
│   │   │   └── core/
│   │   └── requirements.txt
│   │
│   ├── booking/
│   │   └── (chưa cần làm)
│   │
│   └── auth/
│       └── (team khác làm)
│
├── docs/
│   └── api-contracts.md
│
└── README.md

### cho mình services scan driver thôi 
scan-driver/
│
├── app/
│   ├── main.py          # FastAPI app
│   │
│   ├── routers/
│   │   └── scan.py      # /scan-driver/*
│   │
│   ├── models/
│   │   └── scan.py      # Pydantic models
│   │
│   ├── mock_db/
│   │   └── scans.py     # in-memory storage
│   │
│   └── core/
│       └── config.py
│
├── requirements.txt
└── README.md



## Chức năng chính
1. Khách hàng sau khi đã nhập đơn thì sẽ gửi đi yêu cầu của mình (kèm mức thương lượng)
2. Nếu như tài xế đồng ý với mức thương lượng này thì sẽ 


## Ý tưởng
- Suy nghĩ giống như hộp đen, chỉ là input gì và ra output gì, không quan tâm tới toàn hệ thống sẽ trông như thế nào thì sẽ dễ làm. 
- input1: thông tin booking, output1: Danh sách các driver đã đồng ý với giá thương lượng. 
- input2: thông tin tài xế chủ hàng chọn, output2: chuyển qua đặt hàng thành công (của bên booking)

## API contract
### POST /scan-driver/start
> Note: mức độ đầy đủ hơn, nhận request nhận đầy đủ các thông tin của booking. Response thì trả lại cũng các thông tin đầy đủ của booking và scan-id cũng như status (trả lại các thông tin đầy đủ để FE hiển thị ra)

```
Request: {
  "booking_id": "...",
  "pickup": { "lat": ..., "lng": ... , "address": ...},
  "dropoff": { "lat": ..., "lng": ..., "address": ...},
  "cargo": {
    "weight": 1200,
    "unit": "kg",
    "images": ["..."] // sẽ để sau
  },
  "price_offer": {
    "min": 300000,
    "max": 450000
  }
}

Response: {scan_id: "...", status: "SCANNING", `toàn bộ thông tin của booking_id}
```
> note: trả lại để scan-drivers sử dụng để hiển thị. 


### POST /scan-driver/rescan 
> Note: giống y như cái trên không khác gì cả 
```
Request: {
  "booking_id": "...",
  "pickup": { "lat": ..., "lng": ... },
  "dropoff": { "lat": ..., "lng": ... },
  "cargo": {
    "weight": 1200,
    "unit": "kg",
    "images": ["..."]
  },
  "price_offer": {
    "min": 300000,
    "max": 450000
  }
}

Response: {scan_id: "...", status: "SCANNING"}
```


### GET /scan-driver/result/{scan-id}
```
Request: {scan_id: "..."}
Response: {status: "FOUND", driver: [...]} hoặc {status: "TIMEOUT"} hoặc {status: "SCANNING"}
```

> note: BE sẽ quyết định thời gian scan, FE chỉ việc có quyền hỏi kết quả mỗi 1s 
> Trạng thái timeout chính là trong khoảng thời gian đã định trước mà vẫn không có tài xế nào thì đó là timeout


### POST /scan-driver/confirm
```
Request: {booking_id: "...", driver_id: "..."}
Response: {message: "Matching success"}
```

