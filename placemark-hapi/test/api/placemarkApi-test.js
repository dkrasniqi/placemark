/* eslint-disable import/no-extraneous-dependencies */
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { donald, donaldCredentials, testPlacemark, placemarkArray } from "../fixtures.js";

suite("Placemark API tests", () => {

  let user = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(donald);
    await placemarkService.authenticate(donaldCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(donald);
    await placemarkService.authenticate(donaldCredentials);
    testPlacemark.userid = user._id;
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedPlacemark = await placemarkService.createPlacemark(testPlacemark);
    assert.isNotNull(returnedPlacemark);
    assertSubset(testPlacemark, returnedPlacemark);
  });

  test("delete a placemark", async () => {
    const placemarkObj = await placemarkService.createPlacemark(testPlacemark);
    const response = await placemarkService.deletePlacemark(placemarkObj._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlaylist = await placemarkService.getPlacemark(placemarkObj._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No existing placemark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placemarks", async () => {
    for (let i = 0; i < placemarkArray.length; i += 1) {
      placemarkArray[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createPlacemark(placemarkArray[i]);
    }
    let returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, placemarkArray.length);
    await placemarkService.deleteAllPlacemarks();
    returnedPlacemarks = await placemarkService.getAllPlacemarks();
    assert.equal(returnedPlacemarks.length, 0);
  });

  test("remove non-existant playlist", async () => {
    try {
      const response = await placemarkService.deletePlacemark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No existing placemark with this id", "Incorrect Response Message");
    }
  });
});