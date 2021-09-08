import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Empty, Form } from 'antd';
import { FormOutlined } from '@ant-design/icons';

import { Select } from 'components/WithRoles';

import { PROFILE_TYPES } from 'utils/profiles';
import ModalButton from '../ModalButton';
import styles from '../index.module.scss';

const { Item } = Form;

const ProfileSelect = ({
  name,
  label,
  onUpdateChildProfile,
  onCreateChildProfile,
  onFetchMoreProfiles,
  onSearchProfile,
  loadingProfiles,
  profiles,
  profileType,
  content,
  contentProps,
  currentProfileId,
  selectProps,
  isModalProfile,
  form,
  handleOnFormChange,
  handleFetchChildProfile,
  childProfile,
  loadingChildProfile,
  ...restProps
}) => {
  const [profileId, setProfileId] = useState(currentProfileId);

  const onProfileSelect = profile => {
    if (onSearchProfile) {
      onSearchProfile(profileType);
    }
    setProfileId(profile.value);
  };

  const options = useMemo(
    () =>
      profiles.map(profile => ({
        label: profile.name,
        value: profile.id,
      })),
    [profiles]
  );

  return (
    <Item label={label} htmlFor={name} colon={label} {...restProps}>
      <div className={styles.SelectContainer}>
        <Item name={name} noStyle>
          <Select
            placeholder={`Select a ${PROFILE_TYPES[profileType]} profile`}
            onPopupScroll={e => onFetchMoreProfiles(e, profileType)}
            showSearch={onSearchProfile}
            filterOption={false}
            onSearch={value => onSearchProfile(profileType, value)}
            onSelect={onProfileSelect}
            loading={loadingProfiles}
            labelInValue
            notFoundContent={!loadingProfiles && <Empty />}
            options={options}
            {...selectProps}
          />
        </Item>

        {!isModalProfile && (
          <>
            <ModalButton
              activeProfile={childProfile}
              profileType={profileType}
              title={`Edit ${childProfile?.name}`}
              content={content}
              contentProps={contentProps}
              icon={<FormOutlined />}
              tooltipTitle="Edit Profile"
              onSubmit={onUpdateChildProfile}
              form={form}
              name={name}
              handleOnFormChange={handleOnFormChange}
              handleFetchChildProfile={handleFetchChildProfile}
              childProfile={childProfile}
              loadingChildProfile={loadingChildProfile}
              profileId={profileId}
            />
            <ModalButton
              profileType={profileType}
              content={content}
              contentProps={contentProps}
              onSubmit={onCreateChildProfile}
              form={form}
              name={name}
              handleOnFormChange={handleOnFormChange}
            />
          </>
        )}
      </div>
    </Item>
  );
};

ProfileSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onUpdateChildProfile: PropTypes.func,
  onCreateChildProfile: PropTypes.func,
  profiles: PropTypes.instanceOf(Array),
  profileType: PropTypes.string,
  onSearchProfile: PropTypes.func,
  onFetchMoreProfiles: PropTypes.func,
  loadingProfiles: PropTypes.bool,
  content: PropTypes.func.isRequired,
  contentProps: PropTypes.instanceOf(Object),
  currentProfileId: PropTypes.string,
  selectProps: PropTypes.instanceOf(Object),
  isModalProfile: PropTypes.bool,
  form: PropTypes.instanceOf(Object),
  handleOnFormChange: PropTypes.func,
  childProfile: PropTypes.instanceOf(Object),
  loadingChildProfile: PropTypes.bool,
  handleFetchChildProfile: PropTypes.func,
};

ProfileSelect.defaultProps = {
  name: '',
  label: null,
  profileType: '',
  profiles: [],
  onSearchProfile: null,
  onFetchMoreProfiles: () => {},
  loadingProfiles: false,
  contentProps: {},
  currentProfileId: '',
  selectProps: {},
  isModalProfile: false,
  onUpdateChildProfile: () => {},
  onCreateChildProfile: () => {},
  form: {},
  handleOnFormChange: () => {},
  childProfile: {},
  loadingChildProfile: false,
  handleFetchChildProfile: () => {},
};

export default ProfileSelect;
