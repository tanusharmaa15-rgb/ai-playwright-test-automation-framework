import { test, expect } from "@playwright/test";

test.describe("REST API Tests", () => {
  test("GET Posts", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.id).toBe(1);
  });

  test("GET Users", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/users",
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);
  });
});
