import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducers", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      error: null,
      isLoading: false,
      authRedirectPath: "/",
    });
  });

  it("should store the token upon login", () => {
    const someToken = "some-token";
    const someUserID = "some-user-id";
    expect(
      reducer(
        {
          token: null,
          userID: null,
          error: null,
          isLoading: false,
          authRedirectPath: "/",
        },
        { type: actionTypes.AUTH_SUCCESS, token: someToken, userID: someUserID }
      )
    ).toEqual({
      token: someToken,
      userID: someUserID,
      error: null,
      isLoading: false,
      authRedirectPath: "/",
    });
  });
});
