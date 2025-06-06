import Image from "next/image";
import { NavbarProps, icons } from "@/constants";

  const CollapseMenu = ({ toggleNavbar, collapsed }: NavbarProps) => {
  return (
    <button onClick={toggleNavbar}>
      <Image src={collapsed ? "/menu-icon.png" : "/left-arrow.png" } width={icons.nav} height={icons.nav} alt="left arrow" className="mr-5 max-[800px]:mr-10" />
    </button>
  );
};

export default CollapseMenu;
