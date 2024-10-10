import VungHienThi from "./VungHienThi";
import VungNhapThongTin from "./VungNhapThongTin";
import VungTimKiem from "./VungTimKiem";
import { useState } from "react";

function SinhVien() {
  const [reload, setReload] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleReload = () => {
    setReload(!reload);
  };

  const handleSearch = (text) => {
    setSearchText(text);  // Cập nhật từ khóa tìm kiếm
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);  // Cập nhật sinh viên được chọn
  };

  const handleDeleteSelected = (ids) => {
    if (ids.length === 0) {
      alert("Vui lòng chọn ít nhất một sinh viên để xóa.");
      return;
    }

    const promises = ids.map((id) =>
      fetch(`http://localhost:3002/dsSinhVien/${id}`, {
        method: "DELETE",
      })
    );

    Promise.all(promises)
      .then(() => {
        handleReload();  // Tải lại danh sách sinh viên sau khi xóa
        alert("Đã xóa sinh viên thành công.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra trong quá trình xóa sinh viên.");
      });
  };

  return (
    <>
      {/* Truyền `searchText` và hàm tìm kiếm vào VungTimKiem */}
      <VungTimKiem 
        searchText={searchText} 
        setSearchText={setSearchText} 
        onSearch={handleSearch} 
      />
      
      <VungHienThi
        onReload={handleReload}
        reload={reload}
        onSelectStudent={handleSelectStudent}
        onDeleteSelected={handleDeleteSelected}
        searchText={searchText}  // Truyền từ khóa tìm kiếm vào VungHienThi
      />

      <VungNhapThongTin
        reload={reload}
        onReload={handleReload}
        student={selectedStudent}  // Truyền sinh viên được chọn vào VungNhapThongTin
      />
    </>
  );
}

export default SinhVien;
