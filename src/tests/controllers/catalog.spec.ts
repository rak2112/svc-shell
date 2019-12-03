import { catalogsList } from "../mocks";
import * as supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { API_PREFIX } from "../../../src/libs/constants";
import { Server } from "../../../src/Server";
import { Database } from "../../../src/services/Database";
import { config } from "../../config/config.test";

describe("Tenant Catalog", () => {
  const server = new Server(config);
  const mongoServer = new MongoMemoryServer();
  const request = supertest(server.application);

  beforeAll(done => {
    mongoServer.getConnectionString().then(async dbConnectionString => {
      await Database.open({ dbConnectionString });
      server.init();
      done();
    });
  });

  afterAll(() => {
    Database.close();
  });

  describe("POST api/catalogs", () => {
    it("correct body success", async () => {
      return request
        .post(`${API_PREFIX}/catalogs`)
        .send(catalogsList.mockTenantCatalogData)
        .then(res => {
          expect(res.body.metadata.code).toBe(201);
          expect(res.body.metadata.message).toBe("Created");
          expect(res.body.data).not.toBe(null);
        });
    });
    it("incorrect body due to storageType", async () => {
      return request
        .post(`${API_PREFIX}/catalogs`)
        .send(catalogsList.mockIncorrectStorageType)
        .then(res => {
          expect(res.body.metadata.code).toBe(422);
          expect(res.body.metadata.message).toBe("Validation Error");
          expect(res.body.data).not.toBe(null);
        });
    });
  });
  describe("GET api/catalogs", () => {
    it("get catalogs success", async () => {
      return request
        .get(`${API_PREFIX}/catalogs`)
        .query(catalogsList.mockTenantCatalogGetData)
        .then(res => {
          expect(res.body.metadata.code).toBe(200);
          expect(res.body.metadata.message).toBe("OK");
          expect(res.body.data).not.toBe(null);
        });
    });
    it("get catalogs error due to data not found", async () => {
      return request
        .get(`${API_PREFIX}/catalogs`)
        .query(catalogsList.mockTenantCatalogGetErrorData)
        .then(res => {
          expect(res.body.metadata.code).toBe(200);
          // expect(res.body.metadata.message).toBe("Item doesn't exist!");
          expect(res.body.data).not.toBe(null);
        });
    });
    it("get catalogs error due to missing parameter", async () => {
      return request
        .get(`${API_PREFIX}/catalogs`)
        .query(catalogsList.mockTenantCatalogGetMissingErrorData)
        .then(res => {
          expect(res.body.metadata.code).toBe(422);
          expect(res.body.metadata.message).toBe("Validation Error");
          expect(res.body.data).not.toBe(null);
        });
    });
  });
  describe("GET api/catalogs/resourceNames", () => {
    it("get catalogs success", async () => {
      return request
        .get(`${API_PREFIX}/catalogs/resourceNames`)
        .query(catalogsList.mockTenantCatalogResourceNamesData)
        .then(res => {
          expect(res.body.metadata.code).toBe(200);
          expect(res.body.metadata.message).toBe("OK");
          expect(res.body.data).not.toBe(null);
        });
    });
    it("get catalogs with empty body", async () => {
      return request
        .get(`${API_PREFIX}/catalogs/resourceNames`)
        .query(catalogsList.mockTenantCatalogResourceNamesErrorData)
        .then(res => {
          expect(res.body.metadata.code).toBe(200);
          expect(res.body.data).toEqual([]);
        });
    });
  });
});
