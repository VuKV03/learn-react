import { useState, useEffect } from "react";

function VungHienThi(props) {
  const { reload, onSelectStudent } = props;
  const [data, setData] = useState([]);

  const handleSubmitEdit = (student) => {
    onSelectStudent(student);
  };

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3002/dsSinhVien")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    };
    fetchApi();
  }, [reload]);

  return (
    <>
      <div class="container">
        <button type="button" id="btnXoa">
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
            {data.map((sv, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{sv.MaSV}</td>
                <td>{sv.TenSV}</td>
                <td>{sv.NgaySinh}</td>
                <td>{sv.GioiTinh}</td>
                <td>{sv.MaKhoa}</td>
                <td>
                  <a href="#" onClick={() => handleSubmitEdit(sv)}>
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
