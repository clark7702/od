import React from "react";
import { useMediaQuery } from "@mantine/hooks";

const year = new Date().getFullYear();

function Footer() {
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <div className='fixed bottom-0 right-0 left-0'>
      {mobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}

function DesktopView() {
  return (
    <div className='footer'>
      <div className='flex justify-end space-x-4 text-xs font-semibold text-white py-2 px-4 font-sans'>
        <a href='#'>Privacy statement</a>
        <h6>&copy;{year} Microsoft</h6>
      </div>
    </div>
  );
}

function MobileView() {
  return (
    <div className='flex space-x-4 text-xs font-medium text-slate-600 py-2 px-4 font-sans'>
      <h6>&copy;{year} Microsoft</h6>
      <a href='#'>Privacy statement</a>
    </div>
  );
}

export default Footer;
