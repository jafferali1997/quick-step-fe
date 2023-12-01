import { Grid } from '@mui/material';

export default function SmartSolutions() {
  return (
    <div className="tw-mt-[84px] tw-px-4">
      <h1 className="tw-text-center tw-font-dm tw-text-[40px] tw-font-bold tw-leading-10 tw-text-text-dark-gray">
        Smart Solutions for
        <span class="tw-font-bold tw-text-primary-blue"> Your Problems</span>
      </h1>
      <p className="text-normal tw-py-6 tw-text-center">
        Following are some fundamental features of Quickstep
      </p>

      <Grid className="tw-justify-between tw-pt-[20px]" container spacing={2}>
        <Grid className="!tw-flex !tw-flex-col !tw-justify-center" item lg={6} xs={12}>
          <img
            className="tw-m-auto tw-block tw-w-full tw-max-w-[622px]"
            alt="img"
            src="/assets/images/landing/screenshots/documents-processing.png"
          />
        </Grid>
        <Grid className="!tw-flex !tw-flex-col !tw-justify-center" item lg={5} xs={12}>
          <div className="tw-m-auto tw-w-full tw-max-w-[522px]">
            <h2 className="tw-mb-4 tw-font-dm tw-text-3xl tw-font-bold tw-leading-9 tw-text-secondary-black">
              Documents Processing
            </h2>
            <p className="tw-font-dm tw-text-lg tw-font-normal tw-leading-7 tw-text-text-dark-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus,
              ultrices in porttitor in, accumsan. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit.
            </p>
            <p className="tw-pt-5 tw-font-dm tw-text-lg tw-font-normal tw-leading-7 tw-text-text-dark-gray">
              Nulla est purus, ultrices in porttitor in, accumsan. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Nulla est purus, ultrices in porttitorm.
            </p>
          </div>
        </Grid>
      </Grid>

      <div className="tw-flex tw-justify-center">
        <img
          className="xs:tw-max-h-[60px] lg:tw-max-h-[150px]"
          src="/assets/images/landing/screenshots/point-to-right.png"
          alt=""
        />
      </div>

      <Grid className="tw-justify-between tw-pt-[20px]" container spacing={2}>
        <Grid
          className="!tw-flex !tw-flex-col !tw-justify-center xs:tw-order-2 xl:tw-order-1"
          item
          lg={5}
          xs={12}
        >
          <div className="tw-m-auto tw-w-full tw-max-w-[522px]">
            <h2 className="tw-mb-4 tw-font-dm tw-text-3xl tw-font-bold tw-leading-9 tw-text-secondary-black">
              Cancelation of Documents
            </h2>
            <p className="tw-font-dm tw-text-lg tw-font-normal tw-leading-7 tw-text-text-dark-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus,
              ultrices in porttitor in, accumsan. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla est purus, ultrices in porttitor in, accumsan. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus, ultrices
              in porttitorm.
            </p>
          </div>
        </Grid>
        <Grid
          className="!tw-flex !tw-flex-col !tw-justify-center xs:tw-order-1 xl:tw-order-2"
          item
          lg={6}
          xs={12}
        >
          <img
            className="tw-m-auto tw-block tw-w-full tw-max-w-[622px]"
            alt="img"
            src="/assets/images/landing/screenshots/documents-processing.png"
          />
        </Grid>
      </Grid>

      <div className="tw-flex tw-justify-center">
        <img
          className="xs:tw-max-h-[60px] lg:tw-max-h-[150px]"
          src="/assets/images/landing/screenshots/point-to-left.png"
          alt=""
        />
      </div>

      <Grid className="tw-justify-between tw-pt-[20px]" container spacing={2}>
        <Grid className="!tw-flex !tw-flex-col !tw-justify-center" item lg={6} xs={12}>
          <img
            className="tw-m-auto tw-block tw-w-full tw-max-w-[622px]"
            alt="img"
            src="/assets/images/landing/screenshots/send-reminders.png"
          />
        </Grid>
        <Grid className="!tw-flex !tw-flex-col !tw-justify-center" item lg={5} xs={12}>
          <div className="tw-m-auto tw-w-full tw-max-w-[522px]">
            <h2 className="tw-mb-4 tw-font-dm tw-text-3xl tw-font-bold tw-leading-9 tw-text-secondary-black">
              Documents Processing
            </h2>
            <p className="tw-font-dm tw-text-lg tw-font-normal tw-leading-7 tw-text-text-dark-gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est purus,
              ultrices in porttitor in, accumsan. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nulla est purus, ultrices in porttitor in, accumsan.
            </p>
          </div>
        </Grid>
      </Grid>

      <a
        href="/"
        className="btn-primary-blue tw-m-auto tw-my-10 tw-flex tw-items-center tw-gap-3"
      >
        Explore More Features
        <img
          height="16px"
          src="/assets/images/landing/screenshots/btn-arrow.svg"
          alt=""
        />
      </a>
    </div>
  );
}
