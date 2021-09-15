"use strict";
const tester = require("supertest");
const appFolder = require("../../lib/app");
let data = [];
try {
    data = require("../routes/data.json");
}
catch (err) {
    data = [];
}
describe("To test for getting  data from database", () => {
    test("if data is found", async () => {
        if (data.length > 0) {
            await tester(appFolder)
                .get("/users")
                .set("Accept", "application/json")
                .expect(200);
        }
    });
    test("data not found", async () => {
        const data = await tester(appFolder)
            .get("/userss")
            .set("Accept", "application/json")
            .expect(404);
    });
});
describe("This will test for get", () => {
    // test("Get test done", async () =>{
    //     if(data.length>0)
    //     await tester(appFolder)
    //     .post("/:id")
    //     .set("accept", "application/json")
    //     .expect(200)
    //  });
    test("data not found", async () => {
        const data = await tester(appFolder)
            .post("/:idd")
            .set("Accept", "application/json")
            .expect(404);
    });
});
describe("This will test for delete", () => {
    test("Get test done", async () => {
        await tester(appFolder)
            .delete("/users/2")
            .set("accept", "application/json")
            .expect(200);
    });
    test("data not found", async () => {
        const data = await tester(appFolder)
            .delete("/:")
            .set("Accept", "application/json")
            .expect(404);
    });
});
describe("This will test for patch", () => {
    // test("test done", async () =>{
    //     if(data.length>0)
    //     await tester(appFolder)
    //     .patch("/:id")
    //     .set("accept", "application/json")
    //     .expect(200)
    //  });
    test("data not found", async () => {
        const data = await tester(appFolder)
            .patch("/:idd")
            .set("Accept", "application/json")
            .expect(404);
    });
});
