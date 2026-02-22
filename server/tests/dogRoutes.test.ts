import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import request from "supertest";
import express from "express";
import { Request, Response } from "express";
import * as dogController from "../controllers/dogController";
import dogRoutes from "../routes/dogRoutes";

vi.mock("../controllers/dogController");

const app = express();
app.use(express.json());
app.use("/api/dogs", dogRoutes);

describe("dogRoutes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // Test 4: Positive test
  test("GET /api/dogs/random returns 200 with success true and mocked imageUrl", async () => {
    const mockImageUrl =
      "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg";

    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: Request, res: Response) => {
        res.status(200).json({
          success: true,
          data: {
            imageUrl: mockImageUrl,
            status: "success",
          },
        });
      },
    );

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toBe(mockImageUrl);
  });

  // Test 5: Negative test
  test("GET /api/dogs/random returns 500 when something goes wrong", async () => {
    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: Request, res: Response) => {
        res.status(500).json({
          success: false,
          error: "Failed to fetch dog image: Network error",
        });
      },
    );

    const res = await request(app).get("/api/dogs/random");

    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });
});
