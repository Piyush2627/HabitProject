//icons
import { RiSettings3Fill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { MdCreateNewFolder } from "react-icons/md";
import { FaHardDrive } from "react-icons/fa6";
import { useState } from "react";

const SidebarLinks = [
  {
    Icons: <MdCreateNewFolder />,
    title: "Create",
    link: "#",
    subLink: [
      { title: "Sub Create 1", link: "#" },
      { title: "Sub Create 2", link: "#" },
    ],
  },
  {
    Icons: <FaHardDrive />,
    title: "Drive",
    link: "#",
    subLink: [
      { title: "Sub Create 1", link: "#" },
      { title: "Sub Create 2", link: "#" },
    ],
  },
];

function SideNavigation() {
  const [activeSubLink, setActiveSubLink] = useState(null);

  const handleSubLinkToggle = (index: any) => {
    setActiveSubLink((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div className="flex items-center justify-start space-x-2 rounded border border-zinc-600 bg-zinc-800 p-2">
        <div>
          <BsPersonCircle className="size-8 text-white" />{" "}
        </div>
        <div>
          <div className="text-[16px] text-white">Piyush Dahiwadkar</div>
          <div className="text-[12px] text-white">Description</div>
        </div>
      </div>
      <div className="mt-4">
        {SidebarLinks.map((ele, index) => (
          <div key={index}>
            {/* Main link */}
            <div
              className="mb-2 flex cursor-pointer items-center space-x-2 rounded border p-2 text-gray-300"
              onClick={() => handleSubLinkToggle(index)}
            >
              <div>{ele.Icons}</div>
              <div>{ele.title}</div>
            </div>

            {activeSubLink === index && ele.subLink && (
              <div className="ml-4">
                {ele.subLink.map((subEle, subIndex) => (
                  <div
                    key={subIndex}
                    className="mb-1 flex items-center space-x-2 rounded p-2 text-gray-300"
                  >
                    <div>{subEle.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2 text-white">
        <div>
          <RiSettings3Fill className="size-5" />
        </div>
        <div>Setting</div>
      </div>
    </>
  );
}

export default SideNavigation;
