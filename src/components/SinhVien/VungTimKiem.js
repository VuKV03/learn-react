import "./SinhVien.css";

function VungTimKiem({ searchText, setSearchText, onSearch }) {

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);  // Gọi hàm tìm kiếm khi click vào button "Tìm Kiếm"
  };

  return ( 
    <>
      <div className="container">
        <div className="label-container">
          <label htmlFor="txtTuKhoa">Từ khóa:</label>
        </div>
        <input
          type="text"
          id="txtTuKhoa"
          placeholder="Từ khóa cần tìm"
          value={searchText}
          onChange={handleSearchText}
        />
        <button onClick={handleSearch}>Tìm Kiếm</button>
        <button onClick={() => setSearchText("")} >Hiển Thị Toàn Bộ</button>
      </div>
    </>
  );
}

export default VungTimKiem;
