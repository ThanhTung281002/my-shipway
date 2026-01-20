from fastapi import FastAPI 
from pydantic import BaseModel 
from typing import List 
import uuid 
import time 

app = FastAPI()


# NHỮNG HẰNG SỐ SỬ DỤNG TRONG CHƯƠNG TRÌNH
LOG_API = "3. API:"
SCAN_TIME = 40




# ============== 0. MOCK DATABASE ============= 
FAKE_DRIVERS = [
  {
    "driver_id": "DRV-001",
    "name": "Nguyễn Văn Hùng",
    "vehicle": {
      "type": "Xe tải 1.5 tấn",
      "plate": "51C-123.45"
    },
    "location": {
      "lat": 10.780889,
      "lng": 106.695806
    },
    "distance_to_pickup_km": 2.1,
    "price_accept": 420000,
    "rating": 4.8,
    "completed_orders": 312,
    "on_time_rate": 0.97
  },
  {
    "driver_id": "DRV-002",
    "name": "Trần Quốc Bảo",
    "vehicle": {
      "type": "Xe tải 2 tấn",
      "plate": "51D-456.78"
    },
    "location": {
      "lat": 10.768322,
      "lng": 106.682211
    },
    "distance_to_pickup_km": 3.4,
    "price_accept": 400000,
    "rating": 4.6,
    "completed_orders": 198,
    "on_time_rate": 0.95
  },
  {
    "driver_id": "DRV-003",
    "name": "Lê Minh Tài",
    "vehicle": {
      "type": "Xe bán tải",
      "plate": "60C-789.12"
    },
    "location": {
      "lat": 10.790211,
      "lng": 106.710922
    },
    "distance_to_pickup_km": 4.8,
    "price_accept": 380000,
    "rating": 4.4,
    "completed_orders": 145,
    "on_time_rate": 0.93
  },
  {
    "driver_id": "DRV-004",
    "name": "Phạm Hoàng Long",
    "vehicle": {
      "type": "Xe tải 3.5 tấn",
      "plate": "50H-334.90"
    },
    "location": {
      "lat": 10.752114,
      "lng": 106.668902
    },
    "distance_to_pickup_km": 5.2,
    "price_accept": 450000,
    "rating": 4.9,
    "completed_orders": 410,
    "on_time_rate": 0.98
  },
  {
    "driver_id": "DRV-005",
    "name": "Đặng Văn Phúc",
    "vehicle": {
      "type": "Xe tải 1 tấn",
      "plate": "51B-998.76"
    },
    "location": {
      "lat": 10.799201,
      "lng": 106.703114
    },
    "distance_to_pickup_km": 1.9,
    "price_accept": 430000,
    "rating": 4.7,
    "completed_orders": 267,
    "on_time_rate": 0.96
  },
  {
    "driver_id": "DRV-006",
    "name": "Võ Thành Đạt",
    "vehicle": {
      "type": "Xe tải 5 tấn",
      "plate": "51F-222.33"
    },
    "location": {
      "lat": 10.740889,
      "lng": 106.690201
    },
    "distance_to_pickup_km": 6.5,
    "price_accept": 480000,
    "rating": 4.5,
    "completed_orders": 355,
    "on_time_rate": 0.94
  },
  {
    "driver_id": "DRV-007",
    "name": "Ngô Quốc Thắng",
    "vehicle": {
      "type": "Xe tải 2.5 tấn",
      "plate": "51E-777.88"
    },
    "location": {
      "lat": 10.786412,
      "lng": 106.720988
    },
    "distance_to_pickup_km": 3.9,
    "price_accept": 410000,
    "rating": 4.3,
    "completed_orders": 120,
    "on_time_rate": 0.92
  },
  {
    "driver_id": "DRV-008",
    "name": "Bùi Văn Sơn",
    "vehicle": {
      "type": "Xe tải 1.25 tấn",
      "plate": "51C-654.21"
    },
    "location": {
      "lat": 10.771902,
      "lng": 106.698774
    },
    "distance_to_pickup_km": 2.7,
    "price_accept": 395000,
    "rating": 4.6,
    "completed_orders": 230,
    "on_time_rate": 0.95
  },
  {
    "driver_id": "DRV-009",
    "name": "Phan Nhật Quang",
    "vehicle": {
      "type": "Xe bán tải",
      "plate": "59C-321.09"
    },
    "location": {
      "lat": 10.804211,
      "lng": 106.691345
    },
    "distance_to_pickup_km": 5.9,
    "price_accept": 370000,
    "rating": 4.2,
    "completed_orders": 98,
    "on_time_rate": 0.90
  },
  {
    "driver_id": "DRV-010",
    "name": "Trương Văn Khải",
    "vehicle": {
      "type": "Xe tải 3 tấn",
      "plate": "51G-888.66"
    },
    "location": {
      "lat": 10.765402,
      "lng": 106.712345
    },
    "distance_to_pickup_km": 4.1,
    "price_accept": 440000,
    "rating": 4.8,
    "completed_orders": 389,
    "on_time_rate": 0.97
  }
]





# ============== 1. STATE / MEMORY ============ 
scan_sessions = {} 

# hàm này để check format của request của start scan phải không
class Location(BaseModel): 
    lat: float
    lng: float
    address: str


class Cargo(BaseModel): 
    weight: int
    unit: str
    images: List[str]


class PriceOffer(BaseModel): 
    min: int 
    max: int

class ConfirmDriver(BaseModel): 
    scan_id: str
    driver_id: str


class StartScanRequest(BaseModel):
    booking_id: str
    pickup: Location
    dropoff: Location
    cargo: Cargo
    price_offer: PriceOffer





# ============== 2. BUSINESS LOGIC ============ business logic là giống như controller á hà? 


# ============== 3. API ENDPOINTS ============ 
@app.get("/health")
def health_check():
    return {"status": "ok"}






# BẮT ĐẦU SCAN DRIVER 
@app.post("/scan-drivers/start")
def start_scan(request: StartScanRequest): 
    print(f"{LOG_API} START SCAN REQUEST: {request}")

    # 1. tạo scan id 
    scan_id = str(uuid.uuid4())
    print(f"{LOG_API} SCAN CREATED: {scan_id}")


    # 2. tạo scan session  
    scan_sessions[scan_id] = { 
        "booking": request.dict(),
        "status": "SCANNING",
        "started_at": time.time(),
        "candidate_drivers": [], # ban đầu rỗng 
        "result_drivers": [] # ban đầu rỗng 
    }
    print(f"{LOG_API} CURRENT SESSION: {scan_sessions[scan_id]}") # chỗ này phải là scan_sessions[scan_id] chứ 



    # 3. trả kết quả cho FE 
    return {
        "scan_id": scan_id,
        "status": "SCANNING",
        "booking": request.dict()
    }






# SCAN LẠI 
@app.post("/scan-drivers/rescan")
def start_rescan(request: StartScanRequest): 
    print(f"{LOG_API} START RESCAN REQUEST: {request}")

    # 1. tạo scan id 
    scan_id = str(uuid.uuid4())
    print(f"{LOG_API} SCAN CREATED: {scan_id}")


    # 2. tạo scan session  
    scan_sessions[scan_id] = { 
        "booking": request.dict(),
        "status": "SCANNING",
        "started_at": time.time(),
        "candidate_drivers": [], # ban đầu rỗng 
        "result_drivers": [] # ban đầu rỗng 
    }
    print(f"{LOG_API} CURRENT SESSION: {scan_sessions[scan_id]}") # chỗ này phải là scan_sessions[scan_id] chứ 



    # 3. trả kết quả cho FE 
    return {
        "scan_id": scan_id,
        "status": "SCANNING",
        "booking": request.dict()
    }






# LẤY KẾT QUẢ 
@app.get("/scan-drivers/result/{scan_id}")
def get_result(scan_id: str): 
    print(f"{LOG_API} GET RESULT SCAN ID: {scan_id}")


    # 1. tính toán thời gian đã trôi qua của scan_session
    session = scan_sessions.get(scan_id)
    if not session: 
        return {"status": "NOT_FOUND"}


    started_at = session["started_at"]
    now = time.time()
    elapsed = now - started_at
    print(f"{LOG_API} ELAPSED TIME: {elapsed}s")



    # 2. nếu elapsed time bé hơn scan-time thì trả scanning, còn lớn hơn thì trả found và gắn drivers vào 
    if elapsed < SCAN_TIME: 
        return {
            "scan_id": scan_id,
            "status": "SCANNING"
        }
    else: 
        session["status"] = "FOUND"
        session["result_drivers"] = FAKE_DRIVERS[:5]

        return {
            "scan_id": scan_id,
            "status": session["status"],
            "drivers": session["result_drivers"]
        }






# XÁC NHẬN TÀI XẾ 
@app.post("/scan-drivers/confirm")
def confirm(request: ConfirmDriver): 
    print(f"{LOG_API} CONFIRM DRIVER REQUEST: {request}")

    # 1. nếu booking id không có trong dictionary thì trả lại message gì? 
    session = scan_sessions.get(request.scan_id)
    if not session: 
        return {"message": "No scan session found"}

    # 2. kiểm tra scan session có đã ở trạng thái found hay không? Nếu không thì invalid request
    if session["status"] != "FOUND": 
        return {"message": "Scan not ready for confirmation"}

    # 3. kiểm tra xem driver có tồn tại hay không? 
    drivers = session["result_drivers"] # mảng các drivers
    
    found = False
    for driver in drivers: 
        if driver["driver_id"] == request.driver_id:
            found = True
            break
    
    if not found: 
        return {"message": "Driver not found"}



    # 4. nếu ổn thỏa hết thì đổi trạng thái session thành confirmed và báo là match success 
    session["status"] = "CONFIRMED"
    return {
        "message": "Matching confirmed"
    }



# ============== 4. APP INIT ================= app init thì từ từ làm để hiểu thêm 








