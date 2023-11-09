import request from "supertest";
import app from "../app";

describe("GET /all", () => {
  it("should return a list of all posts", async () => {
    const response = await request(app).get("/all");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
