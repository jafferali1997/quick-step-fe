import PropTypes from 'prop-types';
import CircularILoader from '../circular-loader/circular-loader.component';
import ConfirmationModal from '../confirmation-modal/confirmation-modal.component';
import CustomButton from '../custom-button/custom-button.component';
import useFileInput from './use-file-input.hook';

function FileInput({ module, moduleName, fileRef, flexible }) {
  const {
    fileInputRef,
    handleFileInputChange,
    handleUploadButtonClick,
    loading,
    singleDocument,
    alreadyExistPopup,
    handleYesConfirmation,
    handleCancel
  } = useFileInput({
    module,
    moduleName,
    flexible
  });

  return (
    <>
      <ConfirmationModal
        show={alreadyExistPopup}
        onConfirm={handleYesConfirmation}
        onCancel={handleCancel}
        message="File already exist. Want to replace?"
        messageStyling="tw-mt-6 tw-text-sm tw-not-italic tw-font-medium tw-leading-[17.5px]"
        content=""
        img="/assets/icons/gray-question.svg"
        cancelText="No"
        confirmText="Yes"
        cancelTextStyling="y tw-w-[94px] tw-h-9 tw-text-sm tw-not-italic tw-font-medium tw-leading-[17.5px]tw-rounded-md tw-bg-[#AEAEAE] hover:tw-bg-[#AEAEAE] tw-justify-center tw-items-center tw-px-4 tw-py-[7.5px]"
        confirmTextStyling="tw-w-[101px] tw-h-9 tw-text-sm tw-not-italic tw-font-medium tw-leading-[17.5px] tw-rounded-md tw-bg-[#1D4ED8] hover:tw-bg-[#1D4ED8] tw-justify-center tw-items-center tw-px-4 tw-py-[7.5px]"
      />
      <input
        type="file"
        id="fileInput"
        className="tw-hidden"
        ref={flexible ? fileRef : fileInputRef}
        multiple
        accept=".png, .jpeg, .jpg, .pdf"
        onChange={handleFileInputChange}
      />
      {flexible ? null : (
        <>
          <div className="tw-flex tw-items-center tw-justify-between">
            <h5 className="tw-text-xs tw-font-medium tw-not-italic tw-leading-[18px] tw-text-text-dark-gray">
              Attachments
            </h5>
            <CustomButton
              className="tw-items tw-h-9 tw-justify-center tw-rounded-[3px] tw-bg-[#047857] tw-p-2 tw-font-medium tw-not-italic tw-leading-[18px] tw-text-white hover:tw-bg-[#047857]"
              text="Upload File"
              onClick={handleUploadButtonClick}
              disabled={singleDocument && singleDocument?.attachments?.length >= 10}
            />
          </div>
          {loading ? (
            <div className="tw-mt-8">
              <CircularILoader />
            </div>
          ) : (
            <div className="primary-scroll tw-mt-3 tw-max-h-[79px] tw-overflow-y-auto">
              {singleDocument &&
                singleDocument?.attachments &&
                singleDocument?.attachments?.map(({ file }) => {
                  return (
                    <div
                      className="tw-mt-2 tw-flex tw-items-center tw-gap-4 hover:tw-cursor-pointer"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <div className="tw-inline-flex tw-flex-col tw-items-start tw-gap-3">
                        <div className="tw-flex tw-items-center tw-gap-1 tw-rounded-md tw-border tw-border-solid tw-border-disabled-input tw-p-1">
                          {file && file.name && (
                            <div>
                              <img
                                className="tw-h-7 tw-w-7"
                                src={
                                  file.name.split('.').pop() === 'pdf'
                                    ? '/assets/icons/pdf-formate.svg'
                                    : file.name.split('.').pop() === 'jpg'
                                    ? '/assets/icons/jpg-formate.svg'
                                    : file.name.split('.').pop() === 'jpeg'
                                    ? '/assets/icons/jpeg-formate.svg'
                                    : '/assets/icons/png-formate.svg'
                                }
                                alt="file"
                              />
                            </div>
                          )}
                          <div className="tw-flex tw-flex-col tw-gap-1">
                            <div className="tw-max-w-[180px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-xs tw-font-medium tw-not-italic tw-leading-4">
                              {file && file.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
}

FileInput.propTypes = {
  module: PropTypes.string,
  moduleName: PropTypes.string,
  fileRef: PropTypes.string,
  flexible: PropTypes.bool
};

export default FileInput;
