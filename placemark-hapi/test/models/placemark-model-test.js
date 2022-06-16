// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { donald, placemarkArray, testPlacemark } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  setup(async () => {
    db.init();
    await db.placemarkStore.deleteAllPlacemarks();
    for (let i = 0; i < placemarkArray.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      placemarkArray[i] = await db.placemarkStore.addPlacemark(placemarkArray[i]);
    }

    test("create a placemark", async () => {
      const placemark = await db.placemarkStore.addPlacemark(testPlacemark);
      assertSubset(testPlacemark, placemark);
      assert.isDefined(placemark._id);
    });

    test("delete all placemarks", async () => {
      let returned = await db.placemarkStore.getAllPlacemarks();
      assert.equal(returned.length, 3);
      await db.placemarkStore.deleteAllPlacemark();
      returned = await db.placemarkStore.getAllPlacemarks();
      assert.equal(returned.length, 0);
    });

    test("get a placemark - success", async () => {
      const placemark = await db.placemarkStore.addPlacemark(testPlacemark);
      const returned = await db.placemarkStore.getPlacemarkById(playlist._id);
      assertSubset(testPlacemark, placemark);
    });

    test("delete One Placemark - success", async () => {
      const id = placemarkArray[0]._id;
      await db.placemarkStore.deletePlacemarkById(id);
      const returned = await db.placemarkStore.getAllPlacemarks();
      assert.equal(returned.length, placemarkArray.length - 1);
    });



  });

  

});