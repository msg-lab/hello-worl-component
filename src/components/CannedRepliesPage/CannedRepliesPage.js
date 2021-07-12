import React from "react";

import * as selectors from "../../utils/selectors";

const CannedRepliesPage = ({
  pageRoute,
  isPrivate,
  isGlobal,
  isEditAllowed,
  title,
  subtitle,
  addCannedReplyUrl,
  editCategoryUrl,
  category,
  group,
  cannedReplies,
  utils,
  components,
  icons
}) => {
  const { AddButton, Grid, Link, VirtualizedDataTable } = components;
  const { makeStyles } = utils;
  const { FolderOpenIcon, SettingsIcon } = icons;

  const useStyles = makeStyles(theme => ({
    container: {
      margin: "7px 0px",
      alignItems: "center",
      padding: "0px 10px",
      justifyContent: "space-between"
    },
    titleContainer: {
      display: "grid",
      gridColumnGap: "0.5rem",
      gridTemplateColumns: "repeat(4, auto);",
      alignItems: "center",
      justifyContent: "center"
    },
    title: {
      fontSize: "1.15em",
      color: theme.palette.textPrimary.main,
      fontWeight: "500"
    },
    subtitle: {
      color: theme.palette.textPlaceholder.main
    },
    addButton: {
      marginBottom: "0 !important"
    },
    noDataContainer: {
      padding: "2rem",
      textAlign: "center"
    }
  }));

  const classes = useStyles();

  const handleEditCannedReply = () => {
    console.log("Edit canned reply clicked");
  };

  const tableColumns = [
    {
      label: "Shortcut",
      dataKey: "",
      width: 0,
      flexGrow: 1
    },
    {
      label: "Name",
      dataKey: "",
      width: 0,
      flexGrow: 1
    },
    {
      label: "Messages",
      dataKey: "",
      width: 0,
      flexGrow: 2
    },
    {
      label: "Last update",
      dataKey: "modified",
      width: 0,
      flexGrow: 1
    },
    {
      label: "",
      data: "data",
      width: 30,
      render: props => <Edit {...props} />,
      onClick: handleEditCannedReply
    }
  ];

  const headerRenderer = ({ label }) => {
    return <div>{label}</div>;
  };

  return (
    <>
      <Grid container item className={classes.container} wrap="nowrap">
        <div className={classes.titleContainer}>
          {category && <FolderOpenIcon />}
          <div className={classes.title}>{title}</div>
          <div className={classes.subtitle}>{subtitle}</div>
          <Link as={editCategoryUrl} href={pageRoute}>
            <SettingsIcon />
          </Link>
        </div>
        <Link as={addCannedReplyUrl} href={pageRoute}>
          <span>
            <AddButton className={classes.addButton}>
              New canned replies
            </AddButton>
          </span>
        </Link>
      </Grid>
      <VirtualizedDataTable
        data={cannedReplies}
        columns={tableColumns}
        headerRenderer={headerRenderer}
        noRowsRenderer={() => (
          <div className={classes.noDataContainer}>
            <span>No canned replies in this folder.</span>{" "}
            <Link as={addCannedReplyUrl} href={pageRoute}>
              Create a new canned reply.
            </Link>
          </div>
        )}
      />
    </>
  );
};

const CannedRepliesPageContainer = ({
  pageBaseUrl,
  pageRoute,
  isPrivate = false,
  isGlobal = false,
  categoryId,
  groupId,
  data,
  agent,
  groups,
  cannedReplies,
  utils,
  components,
  icons
}) => {
  const category =
    categoryId && data.cannedReplyCategories.find(({ id }) => categoryId == id);

  const parentGroupId = groupId || category?.groupId;
  const group = parentGroupId && groups.find(({ id }) => parentGroupId == id);

  const isCategoryPrivate = (() => {
    if (!categoryId) {
      return false;
    }

    return category.agentId == agent.id;
  })();

  const isCategoryGlobal = (() => {
    if (!categoryId) {
      return false;
    }

    return !category.agentId && !category.groupId;
  })();

  const isEditAllowed = (() => {
    if (data.canEditGlobal) return true;

    if (parentGroupId && data.canEditGroups) {
      return agent.groups.some(({ id }) => id == parentGroupId);
    }

    return agent.id == category?.agentId;
  })();

  const title = (() => {
    if (isPrivate) return "Private";
    if (isGlobal) return "Global";
    if (category) return category.name;
    if (group) return group.name;
  })();

  const subtitle = (() => {
    if (!categoryId) return null;

    if (isCategoryGlobal) {
      return "Global";
    }

    if (isCategoryPrivate) {
      return "Private";
    }

    if (group) {
      return group.name;
    }

    return null;
  })();

  const cannedRepliesUrl = selectors.cannedRepliesUrl({
    pageBaseUrl,
    isGlobal,
    isPrivate,
    groupId,
    categoryId
  });

  const addCannedReplyUrl = `${cannedRepliesUrl}/new`;
  const editCategoryUrl = `${cannedRepliesUrl}/edit`;

  return (
    <CannedRepliesPage
      pageRoute={pageRoute}
      isPrivate={isPrivate}
      isGlobal={isGlobal}
      isEditAllowed={isEditAllowed}
      title={title}
      subtitle={subtitle}
      addCannedReplyUrl={addCannedReplyUrl}
      editCategoryUrl={editCategoryUrl}
      category={category}
      group={group}
      cannedReplies={cannedReplies}
      utils={utils}
      components={components}
      icons={icons}
    />
  );
};

export default CannedRepliesPageContainer;
