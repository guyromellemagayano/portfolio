import supertest from "supertest";
import { describe, expect, it } from "vitest";

import { createServer } from "@api/server";

describe("Server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/status")
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    await supertest(createServer())
      .get("/message/jared")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "hello jared" });
      });
  });
});
