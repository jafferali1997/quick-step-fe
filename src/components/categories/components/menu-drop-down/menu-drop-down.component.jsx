'use client';

import { PropTypes } from 'prop-types';
import DeleteIcon from '@/common/icons/delete.icon';
import PencilIcon from '@/common/icons/pencil.icon';
import ThreedotIcon from '@/common/icons/threedot.icon';
import useMenuDropdown from './use-menu-drop-down.hook';

export default function MenuDropDown({
  handleButtonClickedit,
  id,
  value,
  level,
  handleDeleteCategory
}) {
  const { handleThreeMenu, threeDot, ref } = useMenuDropdown();
  return (
    <div id="three-dot-div" className="tw-flex tw-items-center">
      <div
        id="three-dot-div-2"
        className={`${
          threeDot ? '' : 'threedot'
        } tw-relative tw-m-auto tw-flex tw-w-8 tw-justify-center`}
        onClick={handleThreeMenu}
      >
        {threeDot ? (
          <div
            id="three-dot-div-3"
            ref={ref}
            className="tw-absolute tw-bottom-[-66px] tw-left-[-86px] tw-flex tw-h-[74px] tw-w-[92px] tw-flex-col tw-items-start tw-gap-2 tw-rounded-md tw-border tw-border-solid tw-border-[#CECECE] tw-bg-white tw-p-3 "
          >
            <div
              id="three-dot-div-4"
              className="tw-flex tw-flex-row tw-items-center tw-gap-2 tw-p-0"
              onClick={() => handleButtonClickedit(id, value)}
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
              onClick={() => handleDeleteCategory(id, value, level)}
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

      <img src="/assets/images/arwo-icon.svg" alt="arwo-icon" />
    </div>
  );
}

MenuDropDown.propTypes = {
  handleButtonClickedit: PropTypes.func.isRequired,
  handleDeleteCategory: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired
};
