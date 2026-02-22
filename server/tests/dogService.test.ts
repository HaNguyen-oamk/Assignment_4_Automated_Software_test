import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

describe("dogService.getRandomDogImage", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  // Test 1: Positive test
  test("Returns imageUrl and status success when fetch succeeds", async () => {
    const mockData = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe("success");
    expect(fetch).toHaveBeenCalledOnce();
  });

  // Test 2: Negative test
  test("Throws error when fetch response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      "Dog API returned status 500",
    );
  });
});
