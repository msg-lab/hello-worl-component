export const categoryCannedReplies = (category, { cannedReplies }) =>
  cannedReplies.map(cannedReply => cannedReply.categoryId === category?.id);

export const categoryCannedRepliesCount = (...args) =>
  categoryCannedReplies(...args).length;

export const relativePath = (pageBaseUrl, asPath) =>
  `${asPath}/`.replace(new RegExp(`^${pageBaseUrl}`), "/");
