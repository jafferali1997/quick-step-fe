import { Grid } from '@mui/material';
import CustomButton from '@/common/components/custom-button/custom-button.component';

export default function Hero() {
  return (
    <div className="tw-min-h-hero-height tw-overflow-hidden tw-bg-landing-hero-bg tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-px-4 before:tw-absolute before:tw-right-0 before:tw-top-0 before:tw-z-[-1] before:tw-h-[80vh] before:tw-w-[80vh] before:tw-bg-landing-hero-circle before:tw-bg-contain before:tw-bg-right-top before:tw-bg-no-repeat xs:before:tw-hidden lg:before:tw-block">
      <div className="tw-m-auto tw-w-full tw-max-w-7xl">
        <Grid
          className="tw-min-h-hero-height xs:tw-pb-[32px] xs:tw-pt-[32px] lg:tw-pb-[100px] lg:tw-pt-[80px]"
          container
          spacing={2}
        >
          <Grid className="!tw-flex !tw-flex-col !tw-justify-center" item lg={6} xs={12}>
            <div className="tw-max-w-[610px] xs:tw-m-auto xl:tw-m-0">
              <h1 className="tw-font-dm tw-font-bold tw-text-primary-purple xs:tw-text-[40px] xs:tw-leading-[60px] lg:tw-text-7xl lg:tw-leading-[80px]">
                One app <span className="tw-font-bold tw-text-text-light-black">to</span>{' '}
                <span className="tw-font-bold tw-text-primary-blue">replace</span>{' '}
                <span className="tw-font-bold tw-text-text-light-black">them</span> all
              </h1>

              <p className="text-normal tw-mt-8 tw-max-w-[500px]">
                All of your work in one place: Build Invoices, Manage Customer and
                Products, Manage Employee, Chat, Goals, & more.
              </p>

              <a href="/" className="btn-primary-blue xs:tw-mt-5 lg:tw-mt-12">
                Try Free For 14 Days
              </a>

              <p className="text-normal tw-mt-8 tw-max-w-[500px]">
                Quicksteps is free for 14 days as long as you’d like
              </p>
            </div>
          </Grid>
          <Grid
            className="!xs:tw-hidden !tw-flex-col !tw-justify-center lg:tw-flex"
            item
            lg={6}
            xs={12}
          >
            <div className="tw-relative tw-mx-auto tw-max-w-[637px] xs:tw-hidden lg:tw-block">
              <img
                className="tw-w-full"
                src="assets/images/landing/hero-branding.png"
                alt=""
              />
              <a
                href="/"
                className="tw-absolute tw-left-[42.5%] tw-top-[42%] tw-inline-block tw-flex tw-h-[107px] tw-w-[107px] tw-translate-x-[-50%] tw-translate-y-[-50%] tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-shadow-2xl"
              >
                <img
                  height="30px"
                  width="30px"
                  src="assets/images/landing/play.svg"
                  alt=""
                />
              </a>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
