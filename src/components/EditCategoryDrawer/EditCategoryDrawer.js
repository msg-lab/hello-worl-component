import React, { useEffect } from "react";
import { matchPath } from "react-router-dom";

import { useProvidedData } from "../../context/ProvidedData";
import * as selectors from "../../utils/selectors";

const sharingEnum = {
  SELF: "self",
  GROUP: "group",
  ALL: "all"
};

const convertFromSharing = ({ sharing, group, agent }) => ({
  groupId: sharing === sharingEnum.GROUP ? group.value : null,
  agentId: sharing === sharingEnum.SELF ? agent.id : null
});

const convertToSharing = ({ groupId, agentId }) => {
  if (agentId) {
    return sharingEnum.SELF;
  }

  if (groupId) {
    return sharingEnum.GROUP;
  }

  return sharingEnum.ALL;
};

const prepareDefaultFormData = ({ category, groupOptions }) => ({
  name: category?.name || "",
  sharing: category ? convertToSharing(category) : sharingEnum.SELF,
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

const EditCategoryDrawer = () => {
  const {
    pageBaseUrl,
    pageRoute,
    data,
    agent,
    groups,
    components,
    utils,
    onUpdate
  } = useProvidedData();

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
    Selector
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

  const isNew = Boolean(
    matchPath(path, {
      path: "/category/new",
      exact: true,
      strict: false
    })
  );
  const editMatch = matchPath(path, {
    path: "/category/:id/edit",
    exact: true,
    strict: false
  });

  const categoryId = editMatch?.params?.id;
  const category =
    categoryId && data.cannedReplyCategories.find(({ id }) => categoryId == id);
  const isEdit = Boolean(category);
  const isOpen = isNew || isEdit;

  const serializeFormData = ({ name, group, sharing }) => {
    return {
      cannedReplyCategories: [
        {
          id: categoryId && Number(categoryId),
          name,
          ...convertFromSharing({
            sharing,
            group,
            agent
          }),
          isDeleted: false
        }
      ],
      cannedReplies: []
    };
  };

  const groupOptions = prepareGroupOptions({ data, agent, groups });
  const { control, reset, errors, handleSubmit } = useForm({
    defaultValues: prepareDefaultFormData({
      category,
      groupOptions
    }),
    reValidateMode: "onSubmit"
  });

  useEffect(() => {
    reset(
      prepareDefaultFormData({
        category,
        groupOptions
      })
    );
  }, [category, reset]);

  const handleClose = () => {
    router.back();
  };

  const handleDelete = async () => {
    /* TODO: Add confirmation. */
    const mutationData = {
      cannedReplyCategories: [
        {
          id: categoryId && Number(categoryId),
          name: null,
          agentId: null,
          groupId: null,
          isDeleted: true
        }
      ],
      cannedReplies: []
    };

    await onUpdate(mutationData);
    router.push(pageRoute, pageBaseUrl);
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
