// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { donald, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("User Model tests", () => {
  setup(async () => {
    db.init();
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[i] = await db.userStore.addUser(testUsers[i]);
    }
  });

  test("create a user", async () => {
    const newUser = await db.userStore.addUser(donald);
    assertSubset(donald, newUser);
  });

  test("delete all user", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("get a user - success", async () => {
    const user = await db.userStore.addUser(donald);
    const returnedUser1 = await db.userStore.getUserById(user._id);
    assert.deepEqual(user, returnedUser1);
    const returnedUser2 = await db.userStore.getUserByEmail(user.email);
    assert.deepEqual(user, returnedUser2);
  });

  test("delete One User - success", async () => {
    await db.userStore.deleteUserById(testUsers[0]._id);
    const returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, testUsers.length - 1);
    const deletedUser = await db.userStore.getUserById(testUsers[0]._id);
    assert.isNull(deletedUser);
  });

  test("get a user - bad params", async () => {
    assert.isNull(await db.userStore.getUserByEmail(""));
    assert.isNull(await db.userStore.getUserById(""));
    assert.isNull(await db.userStore.getUserById());
  });

  test("delete One User - fail", async () => {
    await db.userStore.deleteUserById("bad-id");
    const allUsers = await db.userStore.getAllUsers();
    assert.equal(testUsers.length, allUsers.length);
  });

  test("change Name User", async () => {
    const user = await db.userStore.addUser(donald);
    const newFirstName = "Joe";
    const newLastName = "Biden";
    await db.userStore.changeUserName(user._id, newFirstName, newLastName);
    const updatedUser = await db.userStore.getUserById(user._id);
    assert.equal(updatedUser.firstName, newFirstName);
    assert.equal(updatedUser.lastName, newLastName);
  });

  test("change Name Mail", async () => {
    const user = await db.userStore.addUser(donald);
    const newMail = "newdonald@trump.com";
    await db.userStore.changeUserMail(user._id, newMail);
    const updatedUser = await db.userStore.getUserById(user._id);
    assert.equal(updatedUser.email, newMail);
  });

  test("change Password User", async () => {
    const user = await db.userStore.addUser(donald);
    const newPass = "newsecretpass";
    await db.userStore.changeUserPass(user._id, newPass);
    const updatedUser = await db.userStore.getUserById(user._id);
    assert.equal(updatedUser.password, newPass);
  });
});
