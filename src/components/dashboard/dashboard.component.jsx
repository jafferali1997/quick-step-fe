import React, { useState } from 'react';

import { Grid } from '@mui/material';
import DashboardCards from './components/cards/cards.component';
import CustomSelect from '@/common/components/custom-select/custom-select.component';
import DeleteIconRed from '@/common/icons/deletered.icon';
import ReadMore from '@/common/components/readmore/readmore.component';
import BarGraph from '@/common/components/dashboard/bargraph/bargraph.component';

const options = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'tomorrow', label: 'Tomorrow' }
];

const years = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' }
];

const documentstimeline = [
  {
    id: 1,
    icon: '/assets/images/dashboard/documents/dollar-icon.svg',
    title: 'Johen markets',
    titlestatus: 'order',
    time: '25-01-2023 23:41:16 GMT +5',
    status: 'open'
  },
  {
    id: 2,
    icon: '/assets/images/dashboard/documents/dollar-icon.svg',
    title: 'Purpose',
    titlestatus: 'expenses',
    time: '25-01-2023 23:41:16 GMT +5',
    status: 'unpaid'
  },
  {
    id: 3,
    icon: '/assets/images/dashboard/documents/dollar-icon.svg',
    title: 'Purpose',
    titlestatus: 'expenses',
    time: '25-01-2023 23:41:16 GMT +5',
    status: 'paid'
  },
  {
    id: 4,
    icon: '/assets/images/dashboard/documents/dollar-icon.svg',
    title: 'Kulas Nukes',
    titlestatus: 'order',
    time: '25-01-2023 23:41:16 GMT +5',
    status: 'billed'
  },
  {
    id: 5,
    icon: '/assets/images/dashboard/documents/dollar-icon.svg',
    title: 'Johen markets',
    titlestatus: 'order',
    time: '25-01-2023 23:41:16 GMT +5',
    status: 'open'
  }
];

const notes = [
  {
    id: 1,
    date: '13-02-2023',
    by: 'Demo',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    id: 2,
    date: '13-02-2023',
    by: 'Demo',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    id: 3,
    date: '13-02-2023',
    by: 'Demo',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  },
  {
    id: 4,
    date: '13-02-2023',
    by: 'Demo',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
  }
];

export default function Dashboard() {
  return (
    <div className="tw-bg-secondary-gray tw-px-6 tw-py-8">
      <DashboardCards />

      <Grid container spacing={0} className="tw-ml-0 tw-mt-4 tw-w-full tw-gap-y-5">
        <Grid item xs={12} lg={5}>
          <div className="panel tw-p-0 xs:tw-mr-[0px] semixl:tw-mr-[10px]">
            <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-p-4">
              <h2 className="tw-font-dm tw-text-base tw-font-bold tw-capitalize tw-leading-8 tw-text-text-dark-gray">
                Recent Documents
              </h2>
              <CustomSelect
                options={options}
                defaultValue={options[0].value}
                className="!tw-px-0"
              />
            </div>

            <div className="timeline_wrapper scroll_enable tw-mb-6 tw-mt-6 tw-max-h-[272px] tw-overflow-y-auto tw-pl-4 tw-pr-4">
              <ul className="tw-flex tw-flex-col">
                {documentstimeline?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="tw-border-border-gray3 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-1 tw-border-b-[1px] tw-py-4"
                    >
                      <div className="tw-flex tw-items-center tw-gap-4">
                        <img
                          className="tw-h-[40px] tw-w-[40px] tw-rounded-full"
                          src={item.icon}
                          alt="dollar icon"
                        />
                        <div className="tw-flex tw-flex-col tw-gap-1">
                          <h2 className="tw-flex tw-gap-2 tw-font-dm tw-text-sm tw-font-normal tw-leading-5 tw-text-text-black">
                            {item.title}{' '}
                            <span
                              className={`tw-ml-2.5 tw-inline-block tw-rounded-3xl tw-px-2 tw-py-1 tw-font-dm tw-text-xs tw-font-normal tw-capitalize tw-leading-4 ${
                                item.titlestatus.toLowerCase() == 'expenses'
                                  ? 'tw-bg-red-200 tw-text-red-500'
                                  : 'tw-bg-green-200 tw-text-secondary-green'
                              } `}
                            >
                              {item.titlestatus}
                            </span>
                          </h2>
                          <p className="tw-m-0 tw-font-dm tw-text-xs tw-font-normal tw-leading-4 tw-text-text-dark-gray">
                            {item.time}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`tw-font-dm tw-text-sm tw-font-medium tw-capitalize tw-leading-4 ${
                          item.status.toLowerCase() == 'open' ||
                          item.status.toLowerCase() == 'billed'
                            ? 'tw-text-blue-600'
                            : item.status.toLowerCase() == 'unpaid'
                            ? 'tw-text-red-500'
                            : 'tw-text-green-800'
                        }`}
                      >
                        {item.status}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={7}>
          <div className="panel tw-p-0 xs:tw-ml-[0px] semixl:tw-ml-[10px]">
            <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3 tw-p-4">
              <h2 className="tw-font-dm tw-text-base tw-font-bold tw-capitalize tw-leading-8 tw-text-text-dark-gray">
                Notes
              </h2>

              <a
                href="/"
                className="btn-primary-blue tw-rounded-md tw-border-none tw-px-[21px] tw-py-[10px] tw-text-lg"
              >
                Create Notes
              </a>
            </div>

            <div className="timeline_wrapper scroll_enable tw-mb-6 tw-mt-6 tw-max-h-[272px] tw-overflow-y-auto tw-pl-4 tw-pr-4">
              <ul className="tw-flex tw-flex-col">
                {notes?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="tw-border-border-gray4 tw-border-b-[1px] tw-border-t-[1px] tw-px-6 tw-py-5"
                    >
                      <div className="tw-mb-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3">
                        <p className="tw-font-dm tw-text-sm tw-font-normal tw-leading-6 tw-text-text-dark-gray">
                          {item.date}{' '}
                          <span className="tw-font-semibold">by {item.by}</span>
                        </p>
                        <a href="/">
                          <DeleteIconRed />
                        </a>
                      </div>

                      <ReadMore text={item.text} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={0} className="tw-ml-0 tw-mt-4 tw-w-full tw-gap-y-5">
        <Grid item xs={12} lg={7}>
          <div className="panel xs:tw-mr-[0px] semixl:tw-mr-[10px]">
            <div className="tw-mb-[40px] tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-3">
              <h2 className="tw-font-dm tw-text-base tw-font-bold tw-capitalize tw-leading-8 tw-text-text-dark-gray">
                Statics
              </h2>
              <CustomSelect
                options={years}
                defaultValue={years[0].value}
                className="!tw-px-0"
              />
            </div>

            <BarGraph />
          </div>
        </Grid>
        <Grid item xs={12} lg={5}>
          <div className="panel xs:tw-mr-[0px] semixl:tw-mr-[10px]"></div>
        </Grid>
      </Grid>
    </div>
  );
}
