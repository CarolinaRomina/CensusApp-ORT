import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  id: null,
  apiKey: null,
  loggedIn: false,
  occupations: [],
  participantList: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => 
    {
      state.username = action.payload;
    },

    setId: (state, action) =>
    {
      state.id = action.payload;
    },

    setApiKey: (state, action) =>
    {
      state.apiKey = action.payload;
    },

    setLoggedIn: (state, action) =>
    {
      state.loggedIn = action.payload;
    },

    SetOccupations: (state, action) =>
    {
      state.occupations = action.payload;
    },

    setParticipantList: (state, action) =>
    {
      state.participantList = action.payload
    },

    addParticipantToList: (state, action) =>
    {
      state.participantList.push(action.payload)
    },

    clearUser: (state) => 
    {
      state.id = null;
      state.apiKey = null;
      state.loggedIn = false;
    }
  },
});

export const { setUsername, setId, setApiKey, clearUser, setLoggedIn, SetOccupations, setParticipantList, addParticipantToList } = userSlice.actions;
export default userSlice.reducer;