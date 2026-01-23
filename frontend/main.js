console.log("frontend/main.js loaded"); 

let driverMap = null; 
let driverMarker = null; 


// nghĩa là đây là một hàm thuộc tầng render thôi phải không? 
// mục tiêu của mình là hiển thị được quãng đường nối 2 điểm trên bàn đồ để phục vụ cho trang web vì sẽ cần hiển thị 2 bản đồ, 1. bản đồ thể hiện điểm giao, điểm lấy hàng; 2. bản đồ thể hiện điểm lấy hàng và vị trí hiện tại của tài xế. Hướng dẫn mình triển khai điều đó. 
// ví dụ có 2 điểm rồi nhưng về lộ trình giữa 2 điểm đó thì leaflet có làm được không? Và nó lấy quãng đường ngắn nhất phải không? 
function initDriverMap(lat, lng) {
    // nếu map đã tồn tại -> destroy (rất quan trọng khi re-render)
    if (driverMap) {
        driverMap.remove(); 
    }

    // khối này làm gì? 
    driverMap = L.map("driver-map").setView([lat, lng], 15); 

    // Tile từ OpenStreetMap (free) tile map nghĩa là gì? 
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "$copy; OpenStreetMap contributors",
    }).addTo(driverMap);

    driverMarker = L.marker([lat, lng]).addTo(driverMap); 
}




initDriverMap(10.775843, 106.703007); 

