import React from "react";

import NavigationSection from "../NavigationSection";
import Separator from "../Separator";

const Navigation = ({
  pageBaseUrl,
  pageRoute,
  data,
  agent,
  utils,
  components,
  icons
}) => {
  const { AddButton, Link, PageNav } = components;
  const { PersonIcon, PeopleAltIcon } = icons;

  const isPrivate = obj => obj.agentId == agent.id && !obj.group;

  const privateCategories = data.cannedReplyCategories.filter(isPrivate);
  const privateCannedReplies = data.cannedReplies.filter(isPrivate);

  return (
    <PageNav title="Canned Replies">
      <Link as={`${pageBaseUrl}category/new`} href={pageRoute}>
        <span>
          <AddButton>Create category</AddButton>
        </span>
      </Link>
      <Separator Icon={PersonIcon} utils={utils} components={components}>
        Private
      </Separator>
      <NavigationSection
        name="Private"
        categories={privateCategories}
        cannedReplies={privateCannedReplies}
        utils={utils}
        components={components}
        icons={icons}
      />
      <Separator Icon={PeopleAltIcon} utils={utils} components={components}>
        Shared
      </Separator>
    </PageNav>
  );
};

export default Navigation;
