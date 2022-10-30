import React from "react";
import withAuth from "~/web/common/utils/with-auth";
import { Profile } from "~/web/features/profile/Profile";

function ProfilePage() {
  return <Profile />;
}

export default withAuth(ProfilePage);
