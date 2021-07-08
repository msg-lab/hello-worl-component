import React, { useEffect, useState } from "react";
import { matchPath } from "react-router-dom";

import * as selectors from "../../utils/selectors";

const sharingEnum = {
  SELF: "self",
  GROUP: "group",
  ALL: "all"
};

const prepareDefaultFormData = ({ groupOptions }) => ({
  name: "",
  sharing: "self",
  group: groupOptions[0]
});

const prepareGroupOptions = ({ data, agent, groups }) => {
  const assigneableGroups = (() => {
    if (data.canEditGlobal) return groups;
    if (data.canEditGroups) return agent.groups;
    return [];
  })();

  return assigneableGroups.map(({ id, name }) => ({ value: id, label: name }));
};

const EditCategoryDrawer = ({
  pageBaseUrl,
  pageRoute,
  data,
  agent,
  groups,
  components,
  utils,
  onUpdate
}) => {
  const {
    Controller,
    FormBody,
    FormButtonContainer,
    FormControl,
    FormDrawer,
    FormTitle,
    InputTextField,
    RadioGroup,
    Radio,
    Section,
    Selector,
    Snackbar
  } = components;
  const { makeStyles, useForm, useRouter, formValidationUtils } = utils;

  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      flexDirection: "column",
      flex: 1
    },
    groupSharing: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: "1rem",
      alignItems: "center"
    },
    section: { marginBottom: "20px" },
    selector: {}
  }));

  const classes = useStyles();

  const router = useRouter();
  const { asPath } = router;
  const path = selectors.relativePath(pageBaseUrl, asPath);

  const isNew = matchPath(path, {
    path: "/category/new",
    exact: true,
    strict: false
  });
  const isEdit = matchPath(path, {
    path: "/category/:id/edit",
    exact: true,
    strict: false
  });

  const isOpen = isNew || isEdit;

  console.log({ successMessage });

  const groupOptions = prepareGroupOptions({ data, agent, groups });

  const serializeFormData = ({ name, group, sharing }) => {
    return {
      cannedReplyCategories: [
        {
          name,
          groupId: sharing === sharingEnum.GROUP ? group.value : null,
          agentId: sharing === sharingEnum.SELF ? agent.id : null,
          isDeleted: false
        }
      ],
      cannedReplies: []
    };
  };

  const { control, reset, errors, handleSubmit } = useForm({
    defaultValues: prepareDefaultFormData({ groupOptions }),
    reValidateMode: "onSubmit"
  });

  const handleClose = () => {
    router.back();
  };

  const handleDelete = () => {
    console.log("Deleting");
  };

  const onSubmit = async data => {
    const mutationData = serializeFormData(data);
    const result = await onUpdate(mutationData);

    if (!result) {
      return;
    }

    const createdId = result.cannedReplyCategories[0].id;
    router.push(pageRoute, `${pageBaseUrl}category/${createdId}`, {
      shallow: true
    });
  };

  return (
    <>
      <FormDrawer open={isOpen} onClose={handleClose}>
        <div className={classes.container}>
          <FormTitle
            title={isNew ? "New canned reply category" : "Edit category"}
          />
          <FormBody>
            <div>
              <Section
                label="Name"
                required={isNew}
                className={classes.section}
                alertText={errors.name?.message}
                isAlertShown={errors.name}
              >
                <Controller
                  control={control}
                  name="name"
                  as={<InputTextField autoComplete="off" error={errors.name} />}
                  rules={{
                    maxLength: {
                      value: 100,
                      message: "Name should be less than 100 characters"
                    },
                    required: {
                      value: true,
                      message: "Name cannot be empty"
                    },
                    validate: value =>
                      formValidationUtils.validateNonEmptyString(
                        value,
                        "Name cannot be empty"
                      )
                  }}
                />
              </Section>
              <Section
                label="Make this category available for"
                className={classes.section}
                isAlertShown={false}
              >
                <FormControl component="fieldset">
                  <Controller
                    control={control}
                    name="sharing"
                    as={
                      <RadioGroup aria-label="sharing">
                        <Radio value={sharingEnum.SELF} label="Myself" />
                        {groupOptions.length > 0 && (
                          <div className={classes.groupSharing}>
                            <Radio
                              value={sharingEnum.GROUP}
                              label="A specific group"
                            />
                            <Controller
                              control={control}
                              name="group"
                              render={({ value, onChange }) => (
                                <Selector
                                  className={classes.selector}
                                  value={value}
                                  isSearchable={false}
                                  options={groupOptions}
                                  onChange={option => {
                                    reset({ sharing: sharingEnum.GROUP });
                                    onChange(option);
                                  }}
                                  menuWidth="175px"
                                />
                              )}
                            />
                          </div>
                        )}
                        {data.canEditGlobal && (
                          <Radio value={sharingEnum.ALL} label="All agents" />
                        )}
                      </RadioGroup>
                    }
                  />
                </FormControl>
              </Section>
            </div>
          </FormBody>
          <FormButtonContainer
            FormButtonProps={{
              isDeleteShown: !isNew,
              cancelText: "Cancel",
              deleteText: "Delete",
              saveText: isNew ? "Create category" : "Save",
              onCancel: handleClose,
              onDelete: handleDelete,
              onSubmit: handleSubmit(onSubmit)
            }}
          />
        </div>
      </FormDrawer>
    </>
  );
};

export default EditCategoryDrawer;
