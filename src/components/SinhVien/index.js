import VungHienThi from "./VungHienThi";
import VungNhapThongTin from "./VungNhapThongTin";
import VungTimKiem from "./VungTimKiem";
import { useState } from "react";

function SinhVien() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <VungTimKiem />
      <VungHienThi reload={reload}/>
      <VungNhapThongTin reload={reload} onReload={handleReload}/>
    </>
  )
}

export default SinhVien;