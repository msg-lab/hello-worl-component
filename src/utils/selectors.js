export const relativePath = (pageBaseUrl, asPath) =>
  `${asPath}/`.replace(new RegExp(`^${pageBaseUrl}`), "/");

export const countCategoryCannedReplies = (
  categoryId,
  { cannedRepliesMapping }
) => {
  const categoryCannedReplies = cannedRepliesMapping.category[categoryId];

  if (!categoryCannedReplies) return 0;
  return categoryCannedReplies.length;
};

export const cannedRepliesUrl = ({
  pageBaseUrl,
  isGlobal,
  isPrivate,
  groupId,
  categoryId
}) => {
  if (isGlobal) {
    return `${pageBaseUrl}global`;
  }

  if (isPrivate) {
    return `${pageBaseUrl}private`;
  }

  if (groupId) {
    return `${pageBaseUrl}group/${groupId}`;
  }

  if (categoryId) {
    return `${pageBaseUrl}category/${categoryId}`;
  }

  return null;
};
