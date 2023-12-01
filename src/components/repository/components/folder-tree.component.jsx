/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import { useRef, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material/node';
import CustomButton from '@/common/components/custom-button/custom-button.component';
import useClickOutside from '@/common/hooks/use-click-outside';
import CustomInput from '@/common/components/custom-input/custom-input.component';

function FolderTree() {
  const [newFolderName, setNewFolderName] = useState('');
  const [openFolderAction, setopenFolderAction] = useState(null);
  const [openDeleteAction, setopenDeleteAction] = useState(false);
  const [openAddFolderInput, setopenAddFolderInput] = useState(null);

  const openFolderRef = useRef();
  const openAddFolderRef = useRef();

  const [folders, setFolders] = useState([
    {
      name: 'Desk',
      children: []
    }
  ]);

  const handleAddFolder = (parentFolder) => {
    if (newFolderName.trim().length === 0) {
      return;
    }

    const newFolder = {
      name: newFolderName,
      children: []
    };

    const updatedFolders = folders.map((folder) => {
      if (folder === parentFolder) {
        return {
          ...folder,
          children: [...folder.children, newFolder]
        };
      }

      if (folder.children.length > 0) {
        return {
          ...folder,
          children: folder.children.map((child) => {
            if (child === parentFolder) {
              return {
                ...child,
                children: [...child.children, newFolder]
              };
            }

            return child;
          })
        };
      }

      return folder;
    });

    setNewFolderName('');
    setFolders(updatedFolders);
  };
  const handleKeyDown = (event, parentFolder) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent form submission
      handleAddFolder(parentFolder, newFolderName);
      setNewFolderName(''); // clear input value after submission
      setopenAddFolderInput(null);
    }
  };
  useClickOutside(
    [openFolderRef, openAddFolderRef],
    [setopenFolderAction, setopenAddFolderInput]
  );

  const renderFolder = (folder, index) => {
    return (
      <>
        <div className="repo-menu tw-flex tw-cursor-pointer  tw-items-center tw-justify-between">
          <div className="tw-relative tw-flex tw-items-center tw-gap-[7px]">
            <svg
              width="7"
              height="7"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.49998 5.49606C3.37453 5.49606 3.24909 5.44815 3.15344 5.35255L0.143599 2.34268C-0.0478663 2.15122 -0.0478663 1.84079 0.143599 1.6494C0.334987 1.45801 0.645353 1.45801 0.836834 1.6494L3.49998 4.3127L6.16314 1.64949C6.35461 1.45811 6.66494 1.45811 6.85632 1.64949C7.04787 1.84088 7.04787 2.15131 6.85632 2.34277L3.84652 5.35265C3.75083 5.44826 3.62539 5.49606 3.49998 5.49606Z"
                fill="#585858"
              />
            </svg>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7590_159349)">
                <path
                  d="M14.8812 5.79375C14.8003 5.64761 14.6817 5.52587 14.5377 5.44122C14.3936 5.35657 14.2295 5.31212 14.0625 5.3125H5.17875C4.87924 5.31256 4.58783 5.40976 4.34824 5.5895C4.10866 5.76925 3.93384 6.02184 3.85 6.30938L2.09156 12.3375C1.999 12.6548 1.80603 12.9336 1.5416 13.1319C1.27717 13.3302 0.955546 13.4375 0.625 13.4375H11.7962C12.1268 13.4375 12.4485 13.3303 12.713 13.1319C12.9775 12.9336 13.1705 12.6549 13.2631 12.3375L14.9512 6.55C14.9905 6.42564 15.0045 6.29471 14.9925 6.16486C14.9806 6.03501 14.9425 5.90885 14.8812 5.79375Z"
                  fill="#7E7D7D"
                />
                <path
                  d="M1.49063 12.1625L3.25 6.13437C3.37257 5.71764 3.62649 5.35165 3.97393 5.09093C4.32137 4.83021 4.74374 4.68871 5.17812 4.6875H13.125V4.375C13.125 4.04348 12.9933 3.72554 12.7589 3.49112C12.5245 3.2567 12.2065 3.125 11.875 3.125H7.11125C7.01811 3.12502 6.92613 3.10427 6.84202 3.06427C6.7579 3.02427 6.68377 2.96601 6.625 2.89375L6.01062 2.13844C5.8643 1.95852 5.67972 1.81348 5.47031 1.71385C5.26089 1.61422 5.03191 1.56252 4.8 1.5625H1.25C0.918479 1.5625 0.600537 1.6942 0.366117 1.92862C0.131696 2.16304 0 2.48098 0 2.8125L0 12.1875C0 12.3533 0.065848 12.5122 0.183058 12.6294C0.300269 12.7467 0.45924 12.8125 0.625 12.8125C0.820079 12.812 1.00976 12.7484 1.16576 12.6313C1.32175 12.5141 1.43571 12.3497 1.49063 12.1625Z"
                  fill="#7E7D7D"
                />
              </g>
              <defs>
                <clipPath id="clip0_7590_159349">
                  <rect width="15" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h3 className="tw-ml-[5px] tw-text-sm tw-font-normal tw-not-italic tw-leading-[100%] tw-text-text-black">
              {folder.name}
            </h3>
            {openAddFolderInput === folder.name && (
              <div
                ref={openAddFolderRef}
                className=" tw-absolute tw-top-5 tw-z-20 tw-flex tw-w-[222px] tw-bg-white "
              >
                <CustomInput
                  type="text"
                  value={newFolderName}
                  className="tw-w-[200px] "
                  placeholder="Sample Data"
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyDown={(event) => handleKeyDown(event, folder)}
                />
              </div>
            )}
          </div>
          <div className=" tw-relative">
            <div
              className={`${
                openFolderAction === folder.name ? ' ' : 'repo-action-icon'
              }  `}
              onClick={() => setopenFolderAction(folder.name)}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.28125 6.5C5.28125 7.17194 5.82806 7.71875 6.5 7.71875C7.17194 7.71875 7.71875 7.17194 7.71875 6.5C7.71875 5.82806 7.17194 5.28125 6.5 5.28125C5.82806 5.28125 5.28125 5.82806 5.28125 6.5ZM5.28125 10.5625C5.28125 11.2344 5.82806 11.7812 6.5 11.7812C7.17194 11.7812 7.71875 11.2344 7.71875 10.5625C7.71875 9.89056 7.17194 9.34375 6.5 9.34375C5.82806 9.34375 5.28125 9.89056 5.28125 10.5625ZM5.28125 2.4375C5.28125 3.10944 5.82806 3.65625 6.5 3.65625C7.17194 3.65625 7.71875 3.10944 7.71875 2.4375C7.71875 1.76556 7.17194 1.21875 6.5 1.21875C5.82806 1.21875 5.28125 1.76556 5.28125 2.4375Z"
                  fill="black"
                />
              </svg>
            </div>
            {openFolderAction === folder.name && (
              <div
                ref={openFolderRef}
                className=" tw-absolute tw-right-3 tw-top-2 tw-z-10  tw-flex tw-w-[141px] tw-flex-col tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-p-3"
              >
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.01398 1.16504C6.06571 1.16704 4.19778 1.9417 2.8199 3.3191C1.44203 4.6965 0.66673 6.56417 0.664062 8.51244C0.667393 10.4607 1.44283 12.3283 2.82048 13.7059C4.19814 15.0836 6.06569 15.859 8.01398 15.8624C9.96182 15.859 11.8288 15.0834 13.2057 13.7056C14.5826 12.3278 15.3569 10.4603 15.3589 8.51244C15.3569 6.5644 14.5821 4.69672 13.2047 3.31925C11.8272 1.94178 9.96202 1.16704 8.01398 1.16504ZM8.00391 5.16378C8.0933 5.16275 8.18198 5.17968 8.26471 5.21357C8.34743 5.24746 8.42251 5.29762 8.48548 5.36106C8.54846 5.42451 8.59806 5.49996 8.63133 5.58293C8.6646 5.6659 8.68087 5.75471 8.67918 5.84409V7.84472H10.6798C10.8569 7.84472 11.0267 7.91507 11.152 8.04029C11.2772 8.16551 11.3475 8.33535 11.3475 8.51244C11.3475 8.68953 11.2772 8.85937 11.152 8.98459C11.0267 9.10981 10.8569 9.18016 10.6798 9.18016H8.67918V11.1808C8.67918 11.3579 8.60883 11.5277 8.48361 11.6529C8.35839 11.7782 8.18855 11.8485 8.01146 11.8485C7.83437 11.8485 7.66454 11.7782 7.53932 11.6529C7.4141 11.5277 7.34375 11.3579 7.34375 11.1808V9.18268H5.3406C5.16652 9.18638 4.99784 9.1222 4.87025 9.00372C4.74267 8.88524 4.6662 8.72176 4.65703 8.54789C4.64786 8.37401 4.70672 8.2034 4.82113 8.07215C4.93555 7.94091 5.09655 7.85935 5.27005 7.84472C5.29355 7.84348 5.3171 7.84348 5.3406 7.84472H7.33871V5.84409C7.33704 5.75578 7.35291 5.66801 7.3854 5.58587C7.4179 5.50373 7.46636 5.42885 7.528 5.36557C7.58963 5.3023 7.66321 5.25188 7.74447 5.21724C7.82573 5.1826 7.91557 5.16443 8.00391 5.16378Z"
                        fill="#7E7D7D"
                      />
                    </svg>
                  </div>
                  <h4
                    onClick={() => {
                      setopenAddFolderInput(folder.name);
                      setopenFolderAction(null);
                    }}
                    className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black"
                  >
                    Create Folder
                  </h4>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_7590_159378)">
                        <path
                          d="M9.88081 2.68695L1.07744 11.491C1.03311 11.5354 1.00152 11.591 0.985954 11.6518L0.010151 15.5683C-0.00420054 15.6265 -0.00332103 15.6873 0.0127046 15.745C0.0287303 15.8027 0.0593605 15.8553 0.101637 15.8976C0.166572 15.9624 0.254492 15.9987 0.346172 15.9988C0.374454 15.9988 0.402627 15.9953 0.430055 15.9884L4.34662 15.0125C4.40752 14.9972 4.46311 14.9656 4.50743 14.9211L13.3116 6.11769L9.88081 2.68695ZM15.4926 1.48653L14.5126 0.506596C13.8577 -0.148357 12.7162 -0.147707 12.0619 0.506596L10.8616 1.70702L14.2922 5.13763L15.4926 3.93724C15.8197 3.61022 16 3.17491 16 2.71196C16 2.24901 15.8197 1.81371 15.4926 1.48653Z"
                          fill="#7E7D7D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7590_159378">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h4 className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black">
                    Edit
                  </h4>
                </div>
                <div className="tw-flex tw-items-center tw-gap-2">
                  <div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_7590_159406)">
                        <path
                          d="M1.94391 4.6875L2.77419 14.7105C2.83369 15.4333 3.44938 16 4.17494 16H11.8251C12.5507 16 13.1663 15.4333 13.2258 14.7105L14.0561 4.6875H1.94391ZM5.65581 14.125C5.41044 14.125 5.204 13.9341 5.18844 13.6855L4.71969 6.12303C4.70366 5.86441 4.90003 5.64194 5.15822 5.62591C5.426 5.60713 5.63888 5.80581 5.65534 6.06444L6.12409 13.6269C6.14069 13.8948 5.92878 14.125 5.65581 14.125ZM8.46875 13.6562C8.46875 13.9153 8.25909 14.125 8 14.125C7.74091 14.125 7.53125 13.9153 7.53125 13.6562V6.09375C7.53125 5.83466 7.74091 5.625 8 5.625C8.25909 5.625 8.46875 5.83466 8.46875 6.09375V13.6562ZM11.2803 6.12306L10.8116 13.6856C10.7962 13.9316 10.5911 14.1367 10.3144 14.1241C10.0563 14.1081 9.85987 13.8856 9.87591 13.627L10.3447 6.06447C10.3607 5.80584 10.5873 5.61769 10.8418 5.62594C11.1 5.64197 11.2963 5.86444 11.2803 6.12306ZM14.0938 1.875H11.2812V1.40625C11.2812 0.630813 10.6504 0 9.875 0H6.125C5.34956 0 4.71875 0.630813 4.71875 1.40625V1.875H1.90625C1.38847 1.875 0.96875 2.29472 0.96875 2.8125C0.96875 3.33022 1.38847 3.75 1.90625 3.75H14.0938C14.6115 3.75 15.0312 3.33022 15.0312 2.8125C15.0312 2.29472 14.6115 1.875 14.0938 1.875ZM10.3438 1.875H5.65625V1.40625C5.65625 1.14762 5.86637 0.9375 6.125 0.9375H9.875C10.1336 0.9375 10.3438 1.14762 10.3438 1.40625V1.875Z"
                          fill="#7E7D7D"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7590_159406">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <h4
                    onClick={() => setopenDeleteAction(true)}
                    className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[17.5px] tw-text-text-black"
                  >
                    Delete
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="tw-ml-2 tw-mt-2">
          {' '}
          {folder.children.map((child, i) => renderFolder(child, i))}
        </div>
      </>
    );
  };

  return (
    <div>
      {folders.map((folder, index) => renderFolder(folder, index))}
      <Dialog
        className="!tw-rounded-[20px]"
        // ref={refDelete}
        open={openDeleteAction}
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '471px' // Set your width here
            }
          },
          zIndex: 13000
        }}
      >
        <div className="my-scroll tw-max-h-full  tw-max-w-full tw-overflow-y-auto ">
          <DialogContent sx={{ padding: '0px 0px 0px 0px' }}>
            <div className="tw-flex tw-flex-col tw-items-center tw-rounded-[20px] tw-bg-white tw-px-6 tw-py-10">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  viewBox="0 0 72 72"
                  fill="none"
                >
                  <g clipPath="url(#clip0_8079_155896)">
                    <path
                      d="M36 0C16.1028 0 0 16.101 0 36C0 55.8969 16.101 72 36 72C55.8972 72 72 55.899 72 36C72 16.1028 55.899 0 36 0ZM34.9348 52.8495C32.8971 52.8495 31.3334 51.1436 31.3334 49.2006C31.3334 47.2103 32.9445 45.552 34.9348 45.552C36.9252 45.552 38.5834 47.2105 38.5834 49.2008C38.5834 51.1435 36.9723 52.8495 34.9348 52.8495ZM40.3367 34.416C37.7305 36.4537 37.683 37.8752 37.683 40.3393C37.683 41.2398 37.2091 42.2823 34.8872 42.2823C32.9442 42.2823 32.281 41.5714 32.281 39.1074C32.281 35.0321 34.0817 33.0892 35.4559 31.9046C37.0197 30.5776 39.6734 29.1088 39.6734 26.55C39.6734 24.37 37.7779 23.3276 35.4085 23.3276C30.5751 23.3276 31.6177 26.9765 29.0586 26.9765C27.7792 26.9765 26.2155 26.1233 26.2155 24.2754C26.2155 21.7166 29.1534 17.9255 35.5507 17.9255C41.6161 17.9255 45.6441 21.2901 45.6441 25.7444C45.6441 30.1987 41.6161 33.4209 40.3367 34.416Z"
                      fill="#EF2020"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8079_155896">
                      <rect width="72" height="72" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h3 className=" tw-mt-6 tw-text-center tw-text-base tw-font-bold tw-not-italic tw-leading-6 tw-text-text-dark-gray">
                Are you sure you want to delete this Folder?
              </h3>
              <p className="tw-mt-2 tw-text-center tw-text-xs tw-font-normal tw-not-italic tw-leading-[18px] tw-text-text-medium-gray">
                If you Delete the Parent Folder then Child Folder will also Deleted.
              </p>
              <div className="tw-mt-[48px] tw-flex tw-justify-center tw-gap-8">
                <CustomButton
                  onClick={() => setopenDeleteAction(false)}
                  text="Cancel"
                  className="btn-white-cancel tw-h-[40px] tw-w-[75px]"
                />
                <CustomButton
                  text="Delete"
                  type="submit"
                  className="btn-danger tw-h-[40px] tw-w-[75px] "
                  onClick={() => setopenDeleteAction(false)}
                />
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default FolderTree;
