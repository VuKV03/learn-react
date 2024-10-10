import { useState, useEffect } from "react";

function VungHienThi(props) {
  const { reload, onSelectStudent, onDeleteSelected, onReload, searchText } =
    props;
  const [data, setData] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  console.log(searchText);

  const deleteStudent = (id) => {
    const checked = window.confirm("Bạn có chắc chắn muốn xóa sinh viên?");
    if (checked) {
      fetch(`http://localhost:3002/dsSinhVien/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            onReload();
          }
        });
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3002/dsSinhVien")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setFilteredData(data); // Hiển thị toàn bộ dữ liệu khi tải về
        });
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredData(data); // Hiển thị toàn bộ khi không có từ khóa
    } else {
      const filtered = data.filter((sv) =>
        Object.values(sv).some((val) =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData(filtered); // Hiển thị dữ liệu đã lọc
    }
  }, [searchText, data]);

  const handleSelect = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên đã chọn không?")) {
      onDeleteSelected(selectedStudents);
      setSelectedStudents([]); // Reset danh sách đã chọn sau khi xóa
    }
  };

  return (
    <>
      <div class="container">
        <button type="button" id="btnXoa" onClick={handleDelete}>
          Xóa
        </button>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Mã SV</th>
              <th>Tên sinh viên</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Khoa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="list-student">
            {filteredData.map((sv, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(sv.id)}
                    onChange={() => handleSelect(sv.id)}
                  />
                </td>
                <td>{sv.MaSV}</td>
                <td>{sv.TenSV}</td>
                <td>{sv.NgaySinh}</td>
                <td>{sv.GioiTinh}</td>
                <td>{sv.MaKhoa}</td>
                <td>
                  <a href="#" onClick={() => onSelectStudent(sv)}>
                    📝
                  </a>
                  <a href="#">❌</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VungHienThi;
