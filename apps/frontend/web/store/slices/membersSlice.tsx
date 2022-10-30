import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { v4 as uuidv4 } from "uuid";
import { Member } from "../../common/types";
interface MembersState {
  members: Member[];
}
const initialState: MembersState = {
  members: [],
};
const membersSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    changeMemberStatus: (state, action: PayloadAction<string>) => {
      state.members = state.members.map((currentMember) => {
        if (currentMember.id === action.payload) {
          return { ...currentMember, added: !currentMember };
        }
        return currentMember;
      });
    },
  },
});

export const { changeMemberStatus } = membersSlice.actions;

export const selectMembers = (state: RootState) => state.members.members;

export default membersSlice.reducer;
