import CustomButton from '@/common/components/custom-button/custom-button.component';

const howitworks = [
  {
    id: 1,
    icon: '/assets/images/landing/howitworks/account.png',
    step: 'STEP 01',
    title: 'Create Your Account',
    para: 'Simply click on "Lets Get Started" below, enter your details, and create your account.'
  },
  {
    id: 2,
    icon: '/assets/images/landing/howitworks/safe.png',
    step: 'STEP 02',
    title: 'Get Verified',
    para: 'One of the Education Elephant team will review your details and verify your account.'
  },
  {
    id: 3,
    icon: '/assets/images/landing/howitworks/basket.png',
    step: 'STEP 03',
    title: 'Sell Products & Services',
    para: 'Once you receive your account confirmation, you are all set to purchase the tests online.'
  }
];

export default function HowItWorks() {
  return (
    <div className="tw-px-4 xs:tw-mt-[90px] lg:tw-mt-[107px]">
      <h1 className="tw-text-center tw-font-dm tw-text-[40px] tw-font-bold tw-leading-10 tw-text-text-dark-gray">
        How It <span class="tw-font-bold tw-text-primary-blue">Works</span>
      </h1>
      <p className="text-normal tw-py-6 tw-text-center">It’s as simple as 1, 2, 3</p>

      <div className="tw-relative tw-flex tw-flex-wrap tw-justify-center tw-gap-7 before:tw-absolute before:tw-left-[50%] before:tw-z-[-1] before:tw-h-[204px] before:tw-w-[100%] before:tw-max-w-[760.95px] before:tw-translate-x-[-50%] before:tw-bg-howitworks-bg before:tw-bg-contain before:tw-bg-center before:tw-bg-no-repeat xs:before:tw-hidden custom1138:before:tw-block">
        {howitworks.map((card) => {
          return (
            <div
              key={card.id}
              className="tw-flex tw-w-full tw-max-w-[350px] tw-flex-col tw-items-center tw-px-7 tw-text-center xs:tw-py-6 lg:tw-py-10"
            >
              <div className="tw-mb-7 tw-flex tw-h-[130px] tw-w-[130px] tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-shadow-custom">
                <img height="46px" alt="img" src={card.icon} />
              </div>
              <h3 className="tw-font-roboto tw-text-base tw-font-normal tw-leading-6 tw-text-text-gray2">
                {card.step}
              </h3>
              <h2 className="tw-mt-1 tw-font-dm tw-text-lg tw-font-bold tw-leading-6 tw-text-text-black ">
                {card.title}
              </h2>
              <p className="tw-mt-4 tw-font-dm tw-text-lg tw-font-normal tw-leading-6 tw-text-text-dark-gray ">
                {card.para}
              </p>
            </div>
          );
        })}
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-pb-[137px]">
        <CustomButton
          text="Get Started"
          className="btn-primary tw-h-[58px] tw-w-[307px]  tw-whitespace-nowrap tw-px-[103px]  tw-py-[18px] tw-text-lg tw-font-semibold tw-text-white"
        />
        <p className="tw-max-w-[529px] tw-text-center tw-text-sm tw-leading-[17.5px] tw-text-[#7A7A7A]">
          *Please note that some tests have restrictions and can only be purchased by
          those that have suitable testing qualifications.
        </p>
      </div>
    </div>
  );
}
