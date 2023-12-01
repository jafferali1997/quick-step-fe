'use client';

import { PropTypes } from 'prop-types';
import DeleteIcon from '@/common/icons/delete.icon';
import PencilIcon from '@/common/icons/pencil.icon';
import EyeIcon from '@/common/icons/eye.icon';
import ThreedotIcon from '@/common/icons/threedot.icon';
import useMenuDropdown from './use-menu-drop-down.hook';
import RenameIcon from '@/common/icons/rename.icon';

export default function MenuDropDown({
  handleEditTemplate,
  handleViewTemplate,
  handleDeleteTemplate,
  handleRenameTemplate,
  id
}) {
  const { handleThreeMenu, threeDot, ref } = useMenuDropdown();
  return (
    <div id="three-dot-div" className="tw-flex tw-items-center">
      <div
        id="three-dot-div-2"
        className={`${
          threeDot ? '' : 'threedot'
        } tw-relative tw-m-auto tw-flex tw-justify-center`}
        onClick={handleThreeMenu}
      >
        {threeDot ? (
          <div
            id="three-dot-div-3"
            ref={ref}
            className="tw-absolute tw-bottom-[-48px] tw-left-[-150px] tw-flex tw-h-[132px] tw-w-[142px] tw-flex-col tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-p-3"
          >
            <div
              id="three-dot-div-4"
              className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-p-0"
              onClick={() => handleRenameTemplate(id)}
            >
              <RenameIcon id="three-dot-pencil" />
              <p
                id="three-dot-p"
                className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-black"
              >
                Rename
              </p>
            </div>
            <div
              id="three-dot-div-4"
              className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-p-0"
              onClick={() => handleViewTemplate(id)}
            >
              <EyeIcon id="three-dot-eye" />
              <p
                id="three-dot-p"
                className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-black"
              >
                Preview
              </p>
            </div>
            <div
              id="three-dot-div-4"
              className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-p-0"
              onClick={() => handleEditTemplate(id)}
            >
              <PencilIcon id="three-dot-pencil" />
              <p
                id="three-dot-p"
                className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-black"
              >
                Edit
              </p>
            </div>
            <div
              id="three-dot-div-5"
              className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-p-0"
              onClick={() => handleDeleteTemplate(id)}
            >
              <DeleteIcon id="three-dot-delete" />
              <p
                id="three-dot-div-6"
                className="tw-text-sm tw-font-medium tw-not-italic tw-leading-[21px] tw-text-text-black"
              >
                Delete
              </p>
            </div>
          </div>
        ) : null}
        <ThreedotIcon />
      </div>
    </div>
  );
}

MenuDropDown.propTypes = {
  handleEditTemplate: PropTypes.func.isRequired,
  handleViewTemplate: PropTypes.func.isRequired,
  handleDeleteTemplate: PropTypes.func.isRequired,
  handleRenameTemplate: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};
