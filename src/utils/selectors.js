export const categoryCannedReplies = (category, { cannedReplies }) =>
  cannedReplies.map(cannedReply => cannedReply.categoryId === category?.id);

export const categoryCannedRepliesCount = (...args) =>
  categoryCannedReplies(...args).length;
