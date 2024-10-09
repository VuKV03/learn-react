import "./SinhVien.css"

function VungTimKiem() {
  return (
    <>
      <div class="container">
        <div class="label-container">
          <label for="txtTuKhoa">Từ khóa:</label>
        </div>
        <input type="text" id="txtTuKhoa" placeholder="Từ khóa cần tìm" />
        <button>Tìm Kiếm</button>
        <button>Hiển Thị Toàn Bộ</button>
      </div>
    </>
  )
}

export default VungTimKiem;