/* eslint-disable import/no-extraneous-dependencies */
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { donald, donaldCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(donald);
    await placemarkService.authenticate(donald);
    await placemarkService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await placemarkService.createUser(donald);
    const response = await placemarkService.authenticate(donaldCredentials);
    console.log(response);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await placemarkService.createUser(donald);
    const response = await placemarkService.authenticate(donaldCredentials);

    const user = decodeToken(response.token);
    assert.equal(user.email, returnedUser.email);
    assert.equal(user.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    placemarkService.clearAuth();
    try {
      await placemarkService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});