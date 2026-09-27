
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Loader2,
  ShieldCheck,
  LockKeyhole,
} from 'lucide-react';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'OAuth';
  const navigate = useNavigate();

  useEffect(() => {
    // Social sign-in requires a configured OAuth provider on the backend; not wired up yet.
    const timer = setTimeout(() => {
      navigate('/login?error=oauth_not_configured');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const formattedProvider =
    provider.charAt(0).toUpperCase() + provider.slice(1);

  return (
    <div
      className="
        min-h-[70vh]
        flex
        items-center
        justify-center
        px-4
        py-12
      "
      style={{
        fontFamily:
          'Clarkson, Inter, Helvetica Neue, Arial, sans-serif',
      }}
    >
      <div className="w-full max-w-md">

        {/* Main Card */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-[#D8C7B4]/70
            bg-[#FAF7F2]
            shadow-[0_24px_70px_rgba(91,68,48,0.12)]
          "
        >

          {/* Top Accent */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-1.5
              bg-gradient-to-r
              from-[#8C6A4A]
              via-[#D4B483]
              to-[#8C6A4A]
            "
          />

          <div className="px-7 py-10 sm:px-10 sm:py-12">

            {/* Animated Security Icon */}
            <div className="flex justify-center">
              <div className="relative">

                {/* Outer pulse ring */}
                <div
                  className="
                    absolute
                    inset-[-8px]
                    rounded-[25px]
                    border
                    border-[#D4B483]/30
                    animate-ping
                  "
                  style={{
                    animationDuration: '2.5s',
                  }}
                />

                {/* Icon Container */}
                <div
                  className="
                    relative
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-[24px]
                    border
                    border-[#D4B483]/50
                    bg-[#EFE5D7]
                    text-[#6B4E3A]
                    shadow-[0_12px_30px_rgba(107,78,58,0.12)]
                  "
                >
                  <ShieldCheck
                    className="h-9 w-9"
                    strokeWidth={1.6}
                  />

                  {/* Status Dot */}
                  <span
                    className="
                      absolute
                      right-1.5
                      top-1.5
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-[#EFE5D7]
                      bg-[#8C6A4A]
                    "
                  />
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mt-8 text-center">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#8C6A4A]
                "
              >
                Secure authentication
              </p>

              <h1
                className="
                  mt-2
                  text-[27px]
                  font-bold
                  tracking-[-0.03em]
                  text-[#35271E]
                  sm:text-[29px]
                "
              >
                Authenticating with {formattedProvider}
              </h1>

              <p
                className="
                  mx-auto
                  mt-3
                  max-w-sm
                  text-[13px]
                  leading-6
                  text-[#765F4E]
                "
              >
                We are securely verifying your
                authentication credentials and preparing
                your session.
              </p>

            </div>

            {/* Progress Section */}
            <div className="mt-8">

              <div className="mb-3 flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[#8C6A4A]
                  "
                >
                  Verification
                </span>

                <span
                  className="
                    text-[10px]
                    font-medium
                    text-[#9A8573]
                  "
                >
                  In progress
                </span>
              </div>

              {/* Progress Track */}
              <div
                className="
                  h-1.5
                  overflow-hidden
                  rounded-full
                  bg-[#E8DDD1]
                "
              >
                <div
                  className="
                    h-full
                    w-2/3
                    rounded-full
                    bg-gradient-to-r
                    from-[#8C6A4A]
                    to-[#D4B483]
                    animate-pulse
                  "
                />
              </div>

            </div>

            {/* Status */}
            <div
              className="
                mt-7
                flex
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-[#E1D5C7]
                bg-[#F4EEE7]
                px-5
                py-4
              "
            >

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#E8DCCF]
                "
              >
                <Loader2
                  className="
                    h-4
                    w-4
                    animate-spin
                    text-[#6B4E3A]
                  "
                  strokeWidth={2}
                />
              </div>

              <div className="text-left">

                <p
                  className="
                    text-[11px]
                    font-semibold
                    text-[#4D392C]
                  "
                >
                  Establishing secure session
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-[#8A7463]
                  "
                >
                  Please wait while we complete verification.
                </p>

              </div>

            </div>

            {/* Security Information */}
            <div
              className="
                mt-5
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-[#E1D5C7]
                bg-[#FAF7F2]
                px-4
                py-3.5
              "
            >
              <LockKeyhole
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#8C6A4A]
                "
                strokeWidth={1.8}
              />

              <p
                className="
                  text-[10px]
                  leading-5
                  text-[#806B5A]
                "
              >
                Your authentication credentials are handled
                securely. You will be redirected automatically
                once verification is complete.
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <p
          className="
            mt-6
            text-center
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#9A8573]
          "
        >
          Secure authentication portal
        </p>

      </div>
    </div>
  );
};