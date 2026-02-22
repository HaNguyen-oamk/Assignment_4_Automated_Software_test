import { describe, expect, test } from "vitest";
import request from "supertest";
import express from "express";
import dogRoutes from "../routes/dogRoutes";

const app = express();
app.use(express.json());
app.use("/api/dogs", dogRoutes);

describe("Dog API", () => {
  // Test 0:
  test("GET /api/dogs/random returns dog image", async () => {
    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty("data");
    expect(typeof response.body.data.imageUrl).toBe("string");
  });
});
