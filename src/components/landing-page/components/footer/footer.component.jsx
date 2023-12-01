export default function Footer() {
  return (
    <div className="tw-mt-[100px] tw-bg-secondary-gray tw-px-4">
      <div className="container tw-flex tw-flex-wrap tw-justify-between tw-py-10">
        <div className="tw-max-w-[290px]">
          <a href="/">
            <img height="56.43px" width="174px" alt="img" src="/assets/images/footer_logo.png" />
          </a>

          <p className="tw-mt-6 tw-font-dm tw-text-base tw-font-normal tw-leading-6 tw-text-text-dark-gray">
            Lorem ipsum dolor sit amet consectetur. Egestas cursus commodo consequat id.
            Consectetur sed eget dolor egestas eu ullamcorper nunc. Morbi elit at montes
            in ridiculus morbi sed vitae purus. Eget congue malesuada
          </p>
        </div>

        <div className="tw-flex tw-flex-wrap tw-gap-[37px]">
          <div className="tw-flex tw-min-w-[157px] tw-flex-col tw-gap-4">
            <h4 className="tw-font-dm tw-text-base tw-font-semibold tw-leading-6 tw-text-text-black">
              Company
            </h4>

            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              About us
            </a>
            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Contact us
            </a>
            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Blogs
            </a>
          </div>
          <div className="tw-flex tw-min-w-[157px] tw-flex-col tw-gap-4">
            <h4 className="tw-font-dm tw-text-base tw-font-semibold tw-leading-6 tw-text-text-black">
              Support
            </h4>

            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              FAQs
            </a>
            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Help Center
            </a>
          </div>
          <div className="tw-flex tw-min-w-[157px] tw-flex-col tw-gap-4">
            <h4 className="tw-font-dm tw-text-base tw-font-semibold tw-leading-6 tw-text-text-black">
              Agreements
            </h4>

            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Privacy Policy
            </a>
            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Terms of Service
            </a>
            <a
              className="tw-font-dm tw-text-sm tw-font-normal tw-leading-7 tw-text-text-dark-gray"
              href="/"
            >
              Cookie Setting
            </a>
          </div>
          <div className="tw-flex tw-min-w-[157px] tw-flex-col tw-gap-4">
            <h4 className="tw-font-dm tw-text-base tw-font-semibold tw-leading-6 tw-text-text-black">
              Payment Methods
            </h4>
            <div className="tw-flex tw-gap-[6px]">
              <img
                className="tw-h-6"
                alt="img"
                src="assets/images/landing/footer/paypal.png"
              />
              <img
                className="tw-h-6"
                alt="img"
                src="assets/images/landing/footer/visa.png"
              />
              <img
                className="tw-h-6"
                alt="img"
                src="assets/images/landing/footer/masterscard.png"
              />
            </div>
            <h4 className="tw-mt-4 tw-font-dm tw-text-base tw-font-semibold tw-leading-6 tw-text-text-black">
              Follow Us
            </h4>
            <div className=" tw-flex tw-items-center tw-gap-4">
              <a href="/">
                <img
                  className="tw-h-[24px]"
                  alt="img"
                  src="assets/images/landing/footer/Facbook.png"
                />
              </a>
              <a href="/">
                <img
                  className="tw-h-[24px]"
                  alt="img"
                  src="assets/images/landing/footer/linkedin.png"
                />
              </a>
              <a href="/">
                <img
                  className="tw-h-[24px]"
                  alt="img"
                  src="assets/images/landing/footer/Insta.png"
                />
              </a>
              <a href="/">
                <img
                  className="tw-h-[24px]"
                  alt="img"
                  src="assets/images/landing/footer/Twiter.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container home-footer-end-section tw-border-t-2 tw-border-gray-300">
        <p className="tw-py-4 tw-text-center tw-font-dm tw-text-base tw-font-normal tw-leading-5 tw-text-dark-gray">
          © 2023 Quicksteps | All rights reserved.
        </p>
      </div>
    </div>
  );
}
