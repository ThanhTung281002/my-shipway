console.log("Scan page loaded"); 

// ========================= 0.5 DATA =========================
let FAKE_BOOKING = {
  booking_id: "BK_2026_001",

  pickup: {
    address: "12 Nguyễn Huệ, Quận 1, TP.HCM",
    lat: 10.775843,
    lng: 106.703007
  },

  dropoff: {
    address: "45 Quang Trung, Gò Vấp, TP.HCM",
    lat: 10.833084,
    lng: 106.665598
  },

  cargo: {
    weight: 1200,
    unit: "kg",
    images: [
      "/images/cargo_1.jpg",
      "/images/cargo_2.jpg"
    ]
  },

  price_offer: {
    min: 300000,
    max: 450000
  },

  created_at: "2026-01-20T09:15:00Z"
};





let FAKE_DRIVERS = [
  {
    driver_id: "DRV_001",
    name: "Nguyễn Văn Hùng",
    vehicle: {
      type: "Xe tải",
      capacity: 1500,
      unit: "kg"
    },
    rating: 4.8,
    completed_orders: 120,
    on_time_rate: 92,
    distance_to_pickup_km: 2.1,
    price_offer: 420000,
    location: {
      lat: 10.7765,
      lng: 106.7009
    }
  },

  {
    driver_id: "DRV_002",
    name: "Trần Quốc Dũng",
    vehicle: {
      type: "Xe tải",
      capacity: 2000,
      unit: "kg"
    },
    rating: 4.6,
    completed_orders: 98,
    on_time_rate: 88,
    distance_to_pickup_km: 3.5,
    price_offer: 390000,
    location: {
      lat: 10.7722,
      lng: 106.7102
    }
  },

  {
    driver_id: "DRV_003",
    name: "Lê Minh Tâm",
    vehicle: {
      type: "Xe tải",
      capacity: 1000,
      unit: "kg"
    },
    rating: 4.9,
    completed_orders: 150,
    on_time_rate: 95,
    distance_to_pickup_km: 1.8,
    price_offer: 450000,
    location: {
      lat: 10.7799,
      lng: 106.6951
    }
  },

  {
    driver_id: "DRV_004",
    name: "Phạm Hoàng Long",
    vehicle: {
      type: "Xe tải",
      capacity: 2500,
      unit: "kg"
    },
    rating: 4.4,
    completed_orders: 60,
    on_time_rate: 85,
    distance_to_pickup_km: 5.2,
    price_offer: 360000,
    location: {
      lat: 10.7654,
      lng: 106.7123
    }
  },

  {
    driver_id: "DRV_005",
    name: "Võ Thanh Bình",
    vehicle: {
      type: "Xe tải",
      capacity: 1500,
      unit: "kg"
    },
    rating: 4.7,
    completed_orders: 80,
    on_time_rate: 90,
    distance_to_pickup_km: 2.9,
    price_offer: 400000,
    location: {
      lat: 10.7812,
      lng: 106.7045
    }
  }
];






let FAKE_SCAN_SESSION = {
  scan_id: "SCAN_ABC_001",
  status: "FOUND", // SCANNING | FOUND | TIMEOUT

  booking: FAKE_BOOKING,

  drivers: FAKE_DRIVERS,

  started_at: Date.now() - 25000 // ms
};







// state này hiện tại mình thấy 2 cái, đó là dữ liệu mà trang web sử dụng trong một thời điểm và các trạng thái của nó như loading, disbled, polling...v.v 
const state = {
    // 1. dữ liệu hiện thời 
    scan_id: null,
    booking: null, 
    drivers: null,
    selectedDriver: null,
    focusDriver: null
}

const UIState = {
    loading: false,
    disabled: false,
    drivers: null // SCANNING || FOUND || TIMEOUT 
}



const DOM_LOG = "               0. DOM:"; 
const RENDER_LOG = "            1. RENDER:"; 
const API_LOG = "           2. API:"; 
const CONTROLLER_LOG = "        3. CONTROLLER:"
const EVENT_HANDLER_LOG = "   4. EVENT HANDLER:"; 
const INIT_LOG = "5. INIT:"; 

































// ========================= 1. RENDER ========================
function createBookingCard(booking) {
    console.log(`${RENDER_LOG} create booking card with ${booking}`); 

    return `<div class="card-body">
            <h2 class="card-title text-3xl flex justify-center">Chi tiết đơn hàng</h2>

            <div class="divider"></div>

            <div class="info-section">
            <div class="info">
              <div class="label font-bold text-lg">Mã đơn hàng:</div>
              <div class="content flex justify-end">${booking.booking_id}</div>
            </div>


            <div class="info mt-4">
              <div class="label font-bold text-lg">Địa chỉ nhận:</div>
              <div class="content flex justify-end">${booking.pickup.address}</div>
            </div>


            <div class="info mt-4">
              <div class="label font-bold text-lg">Địa chỉ giao:</div>
              <div class="content flex justify-end">${booking.dropoff.address}</div>
            </div>


            <div class="info mt-6  flex items-center gap-2">
              <div class="labell font-bold text-lg">Khối lượng hàng: </div>
              <div class="content">${booking.cargo.weight}${booking.cargo.unit}</div>
            </div>

            
            <div class="info mt-6  flex items-center gap-2">
              <div class="labell font-bold text-lg">Giá thương lượng:</div>
              <div class="content flex justify-center">${booking.price_offer.min} - ${booking.price_offer.max}</div>
            </div>

          </div>

          </div>`


}


const bookingDetails = document.getElementById("booking-details"); console.log(`${DOM_LOG} booking details: ${bookingDetails}`); 
function renderBookingDetails(booking) {
    console.log(`${RENDER_LOG} render booking details section with ${booking}`); 

    // 1. khởi tạo inner html của booking details thành rỗng 
    bookingDetails.innerHTML = ""; 

    // 2. thêm cái đã tạo vào thôi 
    bookingDetails.innerHTML += createBookingCard(booking); 

}

function createDriverRow(driver) {
    return `<tr data-driver-id="${driver.driver_id}" class="${(driver.driver_id === state.focusDriver.driver_id) ? "bg-cyan-400 text-black hover:bg-cyan-500": "hover:bg-base-200"} cursor-pointer transition focus-within:bg-base-300" tabindex="0"> 
                  
                  <td>${driver.name}</td>
                  <td>${driver.vehicle.type} ${driver.vehicle.capacity} ${driver.vehicle.unit}</td>
                  <td class="flex items-center gap-2">${driver.rating} 
                    <div class="text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                        <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </td>
                  <td>${driver.distance_to_pickup_km} km</td>
                  <td>${driver.price_offer}</td>
                </tr>`; 
}



const driversData = document.getElementById("drivers-data"); console.log(`${DOM_LOG} drivers data: ${driversData}`); 
function renderDriversList(drivers) {
    console.log(`${RENDER_LOG} render danh sách tài xế: ${drivers}`); 

    driversData.innerHTML = ""; 
    drivers.forEach((driver) => {
        driversData.innerHTML += createDriverRow(driver); 
    }); 


}

function renderNotFoundDrivers() {
    console.log(`${RENDER_LOG} render không tìm thấy tài xế`); 
}





function createDriverDetailCard(driver) {
    console.log(`${RENDER_LOG} tạo nội dung thẻ thông tin chi tiết tài xế ${driver}`); 

    return `<div class="card-body">
            <h2 class="card-title flex justify-center text-3xl">Thông tin tài xế</h2>

            <div class="general-info mt-2">
              <div class="info flex flex-cols gap-2">
                <div class="labell">Tài xế:</div>
                <div class="content">${driver.name}</div>
              </div>
              <div class="info flex flex-cols gap-2">
                <div class="labell">Đánh giá:</div>
                <div class="content flex items-center gap-2">${driver.rating}
                  <div class="text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                      <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="info flex flex-cols gap-2">
                <div class="labell">Giá cước:</div>
                <div class="content">${driver.price_offer} đồng</div>
              </div>
              <div class="info flex flex-cols gap-2">
                <div class="labell">Loại xe:</div>
                <div class="content">${driver.vehicle.type} ${driver.vehicle.capacity} ${driver.vehicle.unit}</div>
              </div>

            </div>

            <div class="divider my-2"></div>


            <div class="decision-info justify-start font-semibold">
              <div class="info flex justify-center gap-2">
                <div class="labell">Tỉ lệ giao đúng hẹn (%):</div>
                <div class="content">${driver.on_time_rate}</div>
              </div>
              <div class="info flex justify-center gap-2">
                <div class="labell">Số chuyến đã giao: </div>
                <div class="content">${driver.completed_orders}</div>
              </div>
            </div>

            <div class="divider my-2"></div>

            <div class="map">
              <div class="labell flex justify-center">Vị trí tài xế:</div>
              <div id="driver-map" class="w-full h-48 rounded-lg border"></div>
            </div>
            


            <div class="card-action flex justify-center">
              <button data-driver-id="${driver.driver_id}" class="btn btn-accent text-lg">Chọn tài xế này</button>
            </div>
          </div>`; 
}


const driverDetailFound= document.getElementById("driver-detail-found"); console.log(`${DOM_LOG} driver details: ${driverDetailFound}`); 
function renderDriverDetail(driver) {
    console.log(`${RENDER_LOG} render thông tin chi tiết tài xế: ${driver}`); 

    // 1. khởi tạo innerHTML trống
    driverDetailFound.innerHTML = "";


    // 2. Thêm thông tin chi tiết tài xế
    driverDetailFound.innerHTML += createDriverDetailCard(driver); 
}


const confirmDriverModal = document.getElementById("confirm-driver-modal"); console.log(`${DOM_LOG} confirm driver modal: ${confirmDriverModal}`); 
const modalContentName = document.getElementById("modal-content-name"); console.log(`${DOM_LOG} modal content name: ${modalContentName}`); 
const modalContentRating = document.getElementById("modal-content-rating"); console.log(`${DOM_LOG} modal content rating: ${modalContentRating}`); 
const modalContentPriceOffer = document.getElementById("modal-content-price-offer"); console.log(`${DOM_LOG} modal content price offer: ${modalContentPriceOffer}`); 
const modalContentVehicle = document.getElementById("modal-content-vehicle"); console.log(`${DOM_LOG} modal content vehicle: ${modalContentVehicle}`); 


function openConfirmModal(driver) {
    console.log(`${RENDER_LOG} mở modal xác nhận cho driver: ${driver}`); 

    modalContentName.textContent = `${driver.name}`; 
    modalContentRating.textContent = `${driver.rating} sao`; 
    modalContentPriceOffer.textContent = `${driver.price_offer} đồng`;
    modalContentVehicle.textContent = `${driver.vehicle.type} ${driver.vehicle.capacity} ${driver.vehicle.unit}`; 

    confirmDriverModal.showModal(); 
}


function closeConfirmModal() {
    console.log(`${RENDER_LOG} đóng modal xác nhận`); 

    confirmDriverModal.close(); 
}





// ------------ 1.2 state ----------------
// những cái dưới này là ẩn hiện theo state, chứ không phải là render, phải rõ ràng như vậy. Lần sau sẽ để ý phần này hơn. 
const contentContainer = document.getElementById("content-container"); console.log(`${DOM_LOG} content container: ${contentContainer}`); 
const loading = document.getElementById("loading"); console.log(`${DOM_LOG} loading: ${loading}`); 

function showLoading() {
    console.log(`${RENDER_LOG} show loading`); 

    loading.classList.remove("hidden"); 
    contentContainer.classList.add("hidden"); 
}

function hideLoading() {
    console.log(`${RENDER_LOG} hide loading`); 

    loading.classList.add("hidden"); 
    contentContainer.classList.remove("hidden"); 
}


function disableModal() {
  document.body.classList.add("pointer-events-none", "opacity-50");
  document.getElementById("cancel-button").disabled = true; 
  document.getElementById("confirm-button").disabled = true; 
}

function enableModal() {
  document.body.classList.remove("pointer-events-none", "opacity-50");
  document.getElementById("cancel-button").disabled = false; 
  document.getElementById("confirm-button").disabled = false; 
}





// 1.1.2 state của dữ liệu danh sách tài xế 
// note: vì driversData và driversSkeleton là giống như đối nhau nên cái này bật thì cái kia tắt nên không cần làm show drivers data riêng 
const driversSkeleton = document.getElementById("drivers-skeleton"); console.log(`${DOM_LOG} drivers skeleton: ${driversSkeleton}`); 
function showDriversSkeleton() {
    console.log(`${RENDER_LOG} hiển thị drivers skeleton`); 
    
    driversData.classList.add("hidden");
    driversSkeleton.classList.remove("hidden"); 
}

function hideDriversSkeleton() {
    console.log(`${RENDER_LOG} ẩn drivers skeleton`); 

    driversData.classList.remove("hidden");
    driversSkeleton.classList.add("hidden"); 
}




// 1.1.3 state của nút tìm kiếm lại 
const rescanHelper = document.getElementById("rescan-helper"); console.log(`${DOM_LOG} rescan helper: ${rescanHelper}`); 
function showRescanHelper() {
    console.log(`${RENDER_LOG} hiển thị nút tìm kiếm lại`); 

    rescanHelper.classList.remove("hidden"); 
}

function hideRescanHelper() {
    console.log(`${RENDER_LOG} ẩn nút tìm kiếm lại`); 

    rescanHelper.classList.add("hidden"); 
}


// 1.1.4 state của trang danh sách tài xế found và timeout nói chung - 2 cái này ngược nhau nên hiển thằng này thì tắt thằng kia vậy thôi 
const driversFound = document.getElementById("drivers-found"); console.log(`${DOM_LOG} drivers found: ${driversFound}`); 
const driversEmpty = document.getElementById("drivers-empty"); console.log(`${DOM_LOG} drivers empty: ${driversEmpty}`); 

function hideDriversEmpty() {
    console.log(`${RENDER_LOG} ẩn trang báo không tìm thấy tài xế`); 

    driversFound.classList.remove("hidden"); 
    driversEmpty.classList.add("hidden"); 
}

function showDriversEmpty() {
    console.log(`${RENDER_LOG} hiển thị trang báo không tìm thấy tài xế`); 

    driversFound.classList.add("hidden"); 
    driversEmpty.classList.remove("hidden"); 
}








// 1.1.5 state của trang thông tin chi tiết tài xế
const driverDetailScanning = document.getElementById("driver-detail-scanning"); console.log(`${DOM_LOG} driver detail scanning: ${driverDetailScanning}`); 
const driverDetailTimeout = document.getElementById("driver-detail-timeout"); console.log(`${DOM_LOG} driver detail timeout: ${driverDetailTimeout}`);

function hideDriverDetailAll() {
    console.log(`${RENDER_LOG} ẩn hết tất cả những phần của thông tin chi tiết tài xế`); 

    driverDetailFound.classList.add("hidden"); 
    driverDetailScanning.classList.add("hidden"); 
    driverDetailTimeout.classList.add("hidden"); 
}


function showDriverDetailScanning() {
    console.log(`${RENDER_LOG} hiển thị scanning của trang thông tin chi tiết`); 

    driverDetailFound.classList.add("hidden"); 
    driverDetailScanning.classList.remove("hidden"); 
    driverDetailTimeout.classList.add("hidden");
} 

function showDriverDetailFound() {
    console.log(`${RENDER_LOG} hiển thị found của trang thông tin chi tiết`); 

    driverDetailFound.classList.remove("hidden"); 
    driverDetailScanning.classList.add("hidden"); 
    driverDetailTimeout.classList.add("hidden");
} 


function showDriverDetailTimeout() {
    console.log(`${RENDER_LOG} hiển thị timeout của trang thông tin chi tiết`); 

    driverDetailFound.classList.add("hidden"); 
    driverDetailScanning.classList.add("hidden"); 
    driverDetailTimeout.classList.remove("hidden");
} 



// hàm update UI Drivers
function updateDriversUI() {
    console.log(`${RENDER_LOG} cập nhập trạng thái UI liên quan đến tài xế`); 

    if (UIState.drivers === "SCANNING") {
        hideDriversEmpty(); 
        hideRescanHelper(); 
        showDriversSkeleton(); 
        hideDriverDetailAll(); 
        showDriverDetailScanning(); 

    } else if (UIState.drivers === "FOUND") {
        hideDriversEmpty(); 
        hideDriversSkeleton(); 
        showRescanHelper(); 
        hideDriverDetailAll(); 
        showDriverDetailFound(); 

    } else if (UIState.drivers === "TIMEOUT") {
        showDriversEmpty(); 
        showDriverDetailTimeout(); 
    }
}



// ------------- 1.3 render map side effect ---------- vì nó không hẳn là render một html mới mà là thay đổi cái hiển thị một nội dung html 
let driverMap = null; 
let driverMarker = null; 

function initDriverMap(lat, lng) {
    console.log(`${RENDER_LOG} load bản đồ lên driver-map trong thông tin tài xế`); 

    // 1. nếu map đã tồn tại --> destroy 
    if (driverMap) {
        driverMap.remove(); 
    }

    // 2. gán driverMap với html content 
    driverMap = L.map("driver-map").setView([lat, lng], 15); 

    // 3. Tile từ OpenStreetMap 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "$copy; OpenStreetMap contributors",
    }).addTo(driverMap);

    // 4. Thêm marker 
    driverMarker = L.marker([lat, lng]).addTo(driverMap); 
}























// ======================== 2. API ============================
const delay = 500; // ms

// giống với api /scan-drivers/start
async function fakeFetchBookingDetails() {
    console.log(`${API_LOG} fake fetch booking details`); 

    return new Promise(resolve => {
        setTimeout(() => {
            // các hành động thuộc BE (giả lập)
            FAKE_SCAN_SESSION.status = "SCANNING"; 
            FAKE_SCAN_SESSION.booking = FAKE_BOOKING; 
            FAKE_SCAN_SESSION.started_at = Date.now(); 

            // response về FE 
            state.booking = FAKE_BOOKING; 
            state.scan_id = FAKE_SCAN_SESSION.scan_id; 

            resolve(state.booking); 
        }, delay); 
    }); 
}


// đó là trả lại coi thử trong thời gian đó là nếu như lớn 
async function fakeFetchScanResult() {
    console.log(`${API_LOG} fake fetch scan result`); 

    return new Promise(resolve => {
        setTimeout(() => {
            const {scanStatus, drivers} = getScanResult(); 
            resolve({scanStatus, drivers}); 
        }, delay); 
    }); 
}



async function fakeRescan() {
    console.log(`${API_LOG} gửi yêu cầu tìm kiếm lại`); 

    return new Promise(resolve => {
        setTimeout(() => {
            FAKE_SCAN_SESSION.status = "SCANNING"; 
            FAKE_SCAN_SESSION.started_at = Date.now(); 
            resolve(); 
        }, delay); 
    }); 
}


async function fakeConfirm() {
    console.log(`${API_LOG} gửi yêu cầu xác nhận`); 

    return new Promise(resolve => {
        setTimeout(() => {
            alert(`Scan id: ${state.scan_id} và tài xế được chọn là: ${state.selectedDriver}`); 
            resolve(); 
        }, delay); 
    }); 
}



const scanTime = 1000; // ms
// đây là hàm giả sử bên BE 
function getScanResult() {
    console.log(`${API_LOG} giả lập BE, đó là tính toán xem thời gian từ lúc đầu scan và lúc hỏi kết quả có vượt qua scan time hay chưa`); 

    // 1. check xem thử thời gian đã quá thời gian scan hay chưa
    const now = Date.now(); 
    const scan_started_at = FAKE_SCAN_SESSION.started_at; 
    let time = now - scan_started_at; 

    // 2. nếu lớn hơn scan time thì trả found và trả lại list // sẽ thử nghiệm với timeout sau, lần lượt 
    if (time >= scanTime) {
        let randomNumber = Math.random(); 
        if (randomNumber > 0.5) {
           FAKE_SCAN_SESSION.status = "TIMEOUT"; 
        } else {
            FAKE_SCAN_SESSION.status = "FOUND"; 
            FAKE_SCAN_SESSION.drivers = FAKE_DRIVERS; 
        }
        

    } 

    return {
        scanStatus: FAKE_SCAN_SESSION.status,
        drivers: FAKE_SCAN_SESSION.drivers
    }
}

































// ======================== 3. CONTROLLER ========================
async function loadBookingDetail() {
    console.log(`${CONTROLLER_LOG} load thông tin đơn hàng`); 

    showLoading(); 
    try {
        const data = await fakeFetchBookingDetails();     
        state.booking = data; 
        renderBookingDetails(state.booking); 
    } catch(err) {
        alert(err.message); 
    }
    hideLoading(); 
}


let pollTime = 1000; //ms
async function pollScanResult() {
    console.log(`${CONTROLLER_LOG} poll hỏi kết quả scan`); 
    const {scanStatus, drivers} = await fakeFetchScanResult(); 
    state.drivers = drivers; 

    if (scanStatus === "SCANNING") {
        console.log(`${CONTROLLER_LOG} chưa tìm thấy tài xế`); 
        setTimeout(pollScanResult, pollTime); 


    } else if (scanStatus === "FOUND") {
        console.log(`${CONTROLLER_LOG} đã tìm thấy tài xế: ${drivers}`); 
        UIState.drivers = "FOUND"; 
        state.focusDriver = state.drivers[0]; 
        updateDriversUI(); 
        renderDriversList(state.drivers); 
        loadDetailOfFirstDriver();   
    } else if (scanStatus === "TIMEOUT") {
        console.log(`${CONTROLLER_LOG} không tìm thấy tài xế`); 
        UIState.drivers = "TIMEOUT"; 
        updateDriversUI(); 
    }
}


function loadDetailOfFirstDriver() {
    console.log(`${CONTROLLER_LOG} load thông tin chi tiết của tài xế đầu tiên ${state.drivers[0]}`); 

    // 1. render driver details of first driver 
    renderDriverDetail(state.drivers[0]); 
    setTimeout(() => {
        initDriverMap(state.drivers[0].location.lat, state.drivers[0].location.lng); 
    }, 0); 
}


function displayDriverDetails(driver) {
  console.log(`${CONTROLLER_LOG} hiển thị thông tin chi tiết tài xế`); 

  renderDriverDetail(driver); 
  setTimeout(() => {
      initDriverMap(driver.location.lat, driver.location.lng); 
  }, 0); 
}


async function handleRescan() {
    console.log(`${CONTROLLER_LOG} xử lí tìm kiếm lại`); 

    // 1. gửi yêu cầu tìm kiếm lại 
    UIState.drivers = "SCANNING"; 
    updateDriversUI(); 
    await fakeRescan(); 

    // 2. hỏi kết quả của scan 
    await pollScanResult(); 
}



function displayConfirmDriverModal(driver) {
  console.log(`${CONTROLLER_LOG} hiển thị confirm modal cho driver: ${driver}`); 

  openConfirmModal(driver); 
}



async function handleConfirmDriver() {
    console.log(`${CONTROLLER_LOG} xử lí xác nhận tài xế`); 

    // chờ gửi xử lí tài xế thôi 
    disableModal(); 
    await fakeConfirm(); 
    enableModal(); 
    closeConfirmModal(); 
}


function handleUpdateFocusDriver(driver) {
    console.log(`${CONTROLLER_LOG} hàm xử lí việc cập nhập driver được focus vào`); 

    // 1. cập nhập vào state 
    state.focusDriver = driver; 

    // 2. render lại nhanh 
    renderDriversList(state.drivers); 
}















// ======================== 4. EVENT HANDLER =======================
driversData.addEventListener("click", (e) => {
  console.log(`${EVENT_HANDLER_LOG} click vào tài xế trong danh sách`); 

  // 1. tìm row 
  const row = e.target.closest("tr"); 
  if (!row) return; 

  // 2. tìm driver 
  driver = state.drivers.find(driver => driver.driver_id === row.dataset.driverId); 
  if (!driver) return; 

  // 3. hiển thị thông tin chi tiết tài xế
  displayDriverDetails(driver); 
}); 




document.getElementById("rescan-button").addEventListener("click", async () => {
  console.log(`${EVENT_HANDLER_LOG} click vào nút gửi lại`); 

  // 1. handle rescan
  await handleRescan(); 
}); 






driverDetailFound.addEventListener("click", (e) => {
    console.log(`${EVENT_HANDLER_LOG} click vào nút chọn tài xế này`); 

    // 1. tìm button 
    const selectDriverBtn = e.target.closest("button"); 
    if (!selectDriverBtn) return; 

    // 2. tìm tài xế 
    const driver = state.drivers.find(driver => driver.driver_id === selectDriverBtn.dataset.driverId); 
    if (!driver) return; 


    // 3. hiển thị modal xác nhận tài xế 
    state.selectedDriver = driver; 
    displayConfirmDriverModal(driver); 
}); 





document.getElementById("cancel-button").addEventListener("click", () => {
    console.log(`${EVENT_HANDLER_LOG} click nút hủy trên modal xác nhận tài xế`); 

    closeConfirmModal(); 
}); 




document.getElementById("confirm-button").addEventListener("click", async () => {
    console.log(`${EVENT_HANDLER_LOG} click nút xác nhận trên modal xác nhận tài xế`); 

    await handleConfirmDriver(); 
}); 



document.getElementById("rescan-button2").addEventListener("click", async () => {
    console.log(`${EVENT_HANDLER_LOG} click nút gửi lại trong trang không tìm thấy tài xế`); 

    await handleRescan(); 
}); 





driversData.addEventListener("click", (e) => {
    console.log(`${EVENT_HANDLER_LOG} click vào danh sách tài xế để thay đổi focus`); 

    // 1. kiếm cái hàng gần nhất được click vào 
    const row = e.target.closest("tr"); 
    if (!row) return; 

    // 2. kiếm driver từ row đó
    const driver = state.drivers.find(d => d.driver_id === row.dataset.driverId); 
    if (!driver) return; 

    // 1. handle update focus driver 
    handleUpdateFocusDriver(driver); 
}); 









// ======================== 5. INIT =================================
(async () => {
    await loadBookingDetail(); 

    UIState.drivers = "SCANNING"; 
    updateDriversUI(); 

    await pollScanResult(); 
    
})(); 

