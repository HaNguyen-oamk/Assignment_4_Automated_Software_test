import { describe, expect, test, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

vi.mock("../services/dogService");

const createMockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn();
  return res;
};

describe("dogController.getDogImage", () => {
  // Test 3: Positive test
  test("Returns success true and mocked service data", async () => {
    const req: any = {};
    const res = createMockResponse();
    const payload = {
      imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
      status: "success",
    };

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(payload);

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: payload,
    });
  });
});
