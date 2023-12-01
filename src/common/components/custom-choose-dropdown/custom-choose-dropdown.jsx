import PropTypes from 'prop-types';
import PlusIcon from '@/common/icons/plus.icon';
import SearchIcon from '@/common/icons/search-icon';
import CustomButton from '../custom-button/custom-button.component';
import CustomInput from '../custom-input/custom-input.component';
import useCustomDropdown from './use-custom-dropdown.hook';
import CreateTemplateModal from '../modals/create-template-modal/create-template-modal';
import useDocumentTemplate from '@/common/hooks/use-document-template.hook';

function CustomChooseDropdown({
  dropdownWidth,
  dropdownHeight,
  labelName,
  documentType,
  openChooseDropdown,
  setOpenChooseDropdown,
  selectedItem,
  search,
  handleSearchItem,
  listOfItems,
  listOfItemsTwo,
  handleSelectedItem,
  handleEditItem,
  createItem,
  showTemplateStuff
}) {
  const { open, setOpen, handleCreateItem } = useCustomDropdown();

  const { standardTemplateData, simpleTemplateData } = useDocumentTemplate({});

  return (
    <div>
      <CreateTemplateModal
        open={open}
        modalCloseHandler={() => setOpen(false)}
        documentType={documentType}
      />

      {showTemplateStuff && (
        <div className="tw-text-xl tw-font-bold tw-not-italic tw-leading-[30px] tw-text-text-dark-gray">
          {' '}
          Choose Template
        </div>
      )}
      <div
        onClick={() => setOpenChooseDropdown(!openChooseDropdown)}
        className={`tw-mt-4 tw-flex tw-h-${dropdownHeight} ]}
        tw-w-[339px] tw-flex-row tw-items-center tw-justify-between tw-gap-[46px] tw-bg-[#bbbbbb26]  tw-py-2  tw-pl-2  tw-pr-2 hover:tw-cursor-pointer`}
      >
        <p className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-black">
          {selectedItem ||
            simpleTemplateData?.[0]?.templateName ||
            standardTemplateData?.[0]?.templateName ||
            'Standard Template'}
        </p>
        {openChooseDropdown ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1667 9.51174C14.4921 9.18635 14.4921 8.65879 14.1667 8.33341V8.33341C13.8413 8.00802 13.3137 8.00802 12.9884 8.33341L10.7071 10.6146C10.3166 11.0052 9.68344 11.0052 9.29292 10.6146L7.01169 8.33341C6.68631 8.00802 6.15875 8.00802 5.83336 8.33341V8.33341C5.50797 8.65879 5.50797 9.18635 5.83336 9.51174L9.29292 12.9713C9.68344 13.3618 10.3166 13.3618 10.7071 12.9713L14.1667 9.51174Z"
              fill="#46474F"
            />
          </svg>
        ) : (
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.51302 0.833306C1.18763 0.507919 0.660076 0.50792 0.334689 0.833307C0.00930119 1.15869 0.00930119 1.68625 0.334688 2.01164L2.61591 4.29287C3.00644 4.68339 3.00644 5.31656 2.61592 5.70708L0.33469 7.98831C0.00930166 8.31369 0.00930071 8.84125 0.334688 9.16664C0.660076 9.49203 1.18763 9.49203 1.51302 9.16664L4.97258 5.70708C5.36311 5.31656 5.36311 4.68339 4.97258 4.29287L1.51302 0.833306Z"
              fill="#46474F"
            />
          </svg>
        )}
      </div>
      <div className="tw-z-[50] tw-bg-white">
        {openChooseDropdown && (
          <div className="primary-scroll tw-absolute tw-z-[100] tw-mt-3 tw-max-h-[311px] tw-overflow-y-auto tw-rounded tw-border-2 tw-border-l tw-border-solid tw-border-b-disabled-input tw-border-l-disabled-input tw-bg-white hover:tw-cursor-pointer">
            {showTemplateStuff && (
              <div className="tw-px-4 tw-pt-4">
                <div className="tw-mb-[10px] ">
                  <CustomInput
                    placeholder="Search"
                    type="text"
                    className={`tw-relative tw-z-[100] tw-max-h-[42px] tw-max-w-${[
                      dropdownWidth
                    ]}`}
                    value={search}
                    onChange={(event) => handleSearchItem(event)}
                    startIcon={<SearchIcon />}
                  />
                </div>
                <div className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
                  Standard Templates
                </div>
                {listOfItemsTwo &&
                  listOfItemsTwo?.map((item) => {
                    return (
                      <div
                        className="tw-p-4 tw-text-sm tw-font-normal tw-not-italic tw-leading-[17.5px] tw-text-text-light-gray"
                        onClick={() => {
                          handleSelectedItem(item);
                        }}
                      >
                        {item[labelName]}
                      </div>
                    );
                  })}
                <div className=" tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-dark-gray">
                  Custom Templates
                </div>
              </div>
            )}
            {listOfItems?.map((item) => {
              return (
                <div
                  className={`tw-mt-[22px] tw-flex tw-h-[33px] tw-w-${[
                    dropdownWidth
                  ]} tw-items-center tw-justify-between tw-bg-white tw-px-4 tw-py-2`}
                  onClick={() => {
                    handleSelectedItem(item);
                  }}
                >
                  <p className=" tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-base tw-font-normal tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                    {item[labelName]}
                  </p>

                  <div className="pencel-svg" onClick={() => handleEditItem(item.id)}>
                    <img
                      src="/assets/icons/edit-gray.svg"
                      alt="edit"
                      className="tw-h-[13px] tw-w-4"
                    />
                  </div>
                </div>
              );
            })}

            {createItem && (
              <div className={`tw-w-full tw-max-w-${[dropdownWidth]} tw-p-[14px]`}>
                <CustomButton
                  className="tw-h-10 tw-w-[311px] tw-items-center tw-justify-center tw-self-stretch tw-rounded-md tw-bg-[#1d4ed84f] tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black hover:tw-bg-[#1d4ed84f]"
                  text="Create template"
                  onClick={handleCreateItem}
                  startIcon={<PlusIcon />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

CustomChooseDropdown.propTypes = {
  dropdownWidth: PropTypes.string,
  dropdownHeight: PropTypes.string,
  labelName: PropTypes.string,
  documentType: PropTypes.string,
  openChooseDropdown: PropTypes.string,
  setOpenChooseDropdown: PropTypes.func,
  selectedItem: PropTypes.string,
  search: PropTypes.string,
  handleSearchItem: PropTypes.func,
  listOfItems: PropTypes.string,
  listOfItemsTwo: PropTypes.string,
  handleSelectedItem: PropTypes.func,
  handleEditItem: PropTypes.func,
  createItem: PropTypes.func,
  showTemplateStuff: PropTypes.func
};

export default CustomChooseDropdown;
