import { useState, useEffect } from "react";

function VungNhapThongTin(props) {
  const { student, onReload } = props;
  const [data, setData] = useState({
    MaSV: "",
    TenSV: "",
    NgaySinh: "",
    GioiTinh: "",
    MaKhoa: "",
  });

  const [sv, setSV] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3002/dsSinhVien")
        .then((res) => res.json())
        .then((sv) => {
          setSV(sv);
        });
    };
    fetchApi();
  }, []);

  useEffect(() => {
    if (student) {
      setData({
        MaSV: student.MaSV,
        TenSV: student.TenSV,
        NgaySinh: student.NgaySinh,
        GioiTinh: student.GioiTinh,
        MaKhoa: student.MaKhoa,
      });
    } else {
      setData({
        MaSV: "",
        TenSV: "",
        NgaySinh: "",
        GioiTinh: "",
        MaKhoa: "",
      });
    }
  }, [student]);

  const handleSubmitEdit = () => {
    const temp = document.getElementById("txtMaSV").value;
    const student = sv.find((sinhVien) => sinhVien.MaSV === temp);

    if (student) {
      if (!data.MaSV) {
        alert("Vui lòng không được để trống mã sinh viên!");
        return;
      }

      if (!data.TenSV) {
        alert("Vui lòng không được để trống tên sinh viên!");
        return;
      }

      if (!data.MaKhoa || data.MaKhoa == "---  Chọn khoa  ---") {
        alert("Vui lòng chọn khoa cho sinh viên!");
        return;
      }

      const checked = window.confirm(
        "Bạn có chắc chắn muốn cập nhật sinh viên không?"
      );
      if (checked) {
        fetch(`http://localhost:3002/dsSinhVien/${student.id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            onReload();
            setData({
              MaSV: "",
              TenSV: "",
              NgaySinh: "",
              GioiTinh: "",
              MaKhoa: "",
            });
          });
      }
    }
  };

  const handleSubmitAdd = () => {
    if (!data.MaSV) {
      alert("Vui lòng không được để trống mã sinh viên!");
      return;
    }

    if (!data.TenSV) {
      alert("Vui lòng không được để trống tên sinh viên!");
      return;
    }

    if (!data.MaKhoa || data.MaKhoa == "---  Chọn khoa  ---") {
      alert("Vui lòng chọn khoa cho sinh viên!");
      return;
    }

    const checked = window.confirm(
      "Bạn có chắc chắn muốn tạo mới sinh viên không?"
    );
    if (checked) {
      fetch("http://localhost:3002/dsSinhVien", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          onReload();
          console.log("Success:", result);
          setData({
            MaSV: "",
            TenSV: "",
            NgaySinh: "",
            GioiTinh: "",
            MaKhoa: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSubmitDelete = () => {
    console.log("siuu");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <>
      <div className="container">
        <button onClick={handleSubmitAdd}>Thêm mới</button>
        <button onClick={handleSubmitEdit}>Cập nhật</button>
        <button onClick={handleSubmitDelete} type="button">
          Xóa
        </button>
        <br />

        <label className="label-container">
          Mã SV <span className="required">*</span>
        </label>
        <input
          type="text"
          id="txtMaSV"  
          name="MaSV"
          value={data.MaSV}
          required
          onChange={handleChange}
        />
        <br />

        <label className="label-container">
          Tên sinh viên <span className="required">*</span>
        </label>
        <input
          type="text"
          id="txtTenSV"
          name="TenSV"
          value={data.TenSV}
          required
          onChange={handleChange}
        />
        <br />

        <label className="label-container">Ngày sinh</label>
        <input
          type="text"
          id="txtNgaySinh"
          name="NgaySinh"
          value={data.NgaySinh}
          onChange={handleChange}
        />
        <br />

        <label className="label-container">Giới tính</label>
        <input
          type="radio"
          name="GioiTinh"
          id="male"
          value="Nam"
          checked={data.GioiTinh === "Nam"}
          onChange={handleChange}
        />
        <label htmlFor="male">Nam</label>

        <input
          type="radio"
          name="GioiTinh"
          id="female"
          value="Nữ"
          checked={data.GioiTinh === "Nữ"}
          onChange={handleChange}
        />
        <label htmlFor="female">Nữ</label>
        <br />

        <label className="label-container">
          Khoa <span className="required">*</span>
        </label>
        <select
          id="drpKhoa"
          name="MaKhoa"
          value={data.MaKhoa}
          required
          onChange={handleChange}
        >
          <option value="">--- Chọn khoa ---</option>
          <option value="Công nghệ thông tin">Công nghệ thông tin</option>
          <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
          <option value="Điện tử viễn thông">Điện tử viễn thông</option>
        </select>
        <br />
      </div>
    </>
  );
}

export default VungNhapThongTin;
