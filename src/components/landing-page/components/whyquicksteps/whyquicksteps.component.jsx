const whyquickstep = [
  {
    id: '1',
    icon: '/assets/images/landing/whyquicksteps/handle-documents.svg',
    title: 'Handle documents and Automate Calculations',
    para: 'A personzlied solution for organziaing documents'
  },
  {
    id: '2',
    icon: '/assets/images/landing/whyquicksteps/personalized-support.svg',
    title: 'Personalized Support',
    para: 'Our dedicated support team is available 24/7'
  },
  {
    id: '3',
    icon: '/assets/images/landing/whyquicksteps/access-anywhere.svg',
    title: 'Access anywhere and anytime',
    para: 'Access your data from a reliable and secure platform'
  }
];

export default function WhyQuicksteps() {
  return (
    <div className="tw-px-4 md:tw-mt-[70px] lg:tw-mt-[150px]">
      <div className="tw-mx-auto tw-max-w-[1080px]">
        <h1 className="tw-text-center tw-font-dm tw-text-[40px] tw-font-bold tw-leading-10 tw-text-text-dark-gray">
          Why
          <span class="tw-font-bold tw-text-primary-blue">Quicksteps</span>
        </h1>
        <p className="text-normal tw-py-6 tw-text-center">
          We facilitate the process to create win-win strategies, aligning world-class
          marketing functions with consumer’s interests in mind and bringing forth the
          best possible growth solutions for businesses.
        </p>
      </div>

      <div className="tw-mt-10 tw-flex tw-flex-wrap tw-justify-center tw-gap-7">
        {whyquickstep.map((card) => {
          return (
            <div
              key={card.id}
              className=" tw-flex tw-min-h-[384px] tw-w-full tw-max-w-[392px] tw-flex-col tw-items-center tw-justify-center tw-rounded-[20px] tw-px-8 tw-py-14 tw-text-center tw-shadow-custom"
            >
              <img
                className="tw-mb-6 tw-h-[124px] tw-object-contain tw-object-center"
                alt="img"
                src={card.icon}
              />
              <h4 className="tw-mb-3 tw-font-dm tw-text-xl tw-font-bold tw-leading-8 tw-text-text-black">
                {card.title}
              </h4>
              <p className="tw-font-dm tw-text-base tw-font-normal tw-leading-6 tw-text-text-gray">
                {card.para}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
