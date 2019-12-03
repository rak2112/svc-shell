import { Router } from "express";
import { checkSchema } from "express-validator/check";

import validations from "./validations";
import catalogControllerInstance from "./CatalogController";
import { controllerAdapter, schemaErrorHandler } from "../../middlewares";

const router = Router();

//#region [swagger: /catalogs/]
/**
 * @swagger
 * /catalogs/:
 *   get:
 *     tags:
 *       - Catalogs
 *     description: Get resourceName and credential for a specified tenant.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: tenantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Refers to the tenantId.
 *       - in: query
 *         name: appCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Refers to the appCode.
 *       - in: query
 *         name: serviceCode
 *         schema:
 *           type: string
 *         description: Refers to the serviceCode.
 *       - in: query
 *         name: storageType
 *         schema:
 *           type: string
 *         description: Refers to the storageType and must be [SQL, Blob, NoSQL].
 *     responses:
 *       200:
 *         description: Successfully get
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 5dce4cd1c1e1e517dc3591b9
 *                   resourceName:
 *                     type: string
 *                     example: resourceName
 *                   credential:
 *                     type: string
 *                     example: credential
 *                   appCode:
 *                     type: string
 *                     example: appCode
 *                   correlationId:
 *                     type: string
 *                     example: correlationId
 *                   serviceCode:
 *                     type: string
 *                     example: serviceCode
 *                   storageType:
 *                     type: string
 *                     example: SQL
 *                   tenantId:
 *                     type: string
 *                     example: tenantId
 *             metadata:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: "#/definitions/400 - Bad Request"
 *       422:
 *         description: Unprocessable entity.Validation Error. Any of the fields sent are invalid.
 *         schema:
 *            $ref: "#/definitions/422 - UnProcessable"
 */
//#endregion
router.route("/").get(checkSchema(validations.list as any), schemaErrorHandler, controllerAdapter(catalogControllerInstance, "list"));

//#region [swagger: /catalogs]
/**
 * @swagger
 * /catalogs:
 *   post:
 *     tags:
 *       - Catalogs
 *     description: Create tenant.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - tenantId
 *             - appCode
 *             - serviceCode
 *             - correlationId
 *             - storageType
 *             - credential
 *           properties:
 *             tenantId:
 *               type: string
 *               example: tenantId
 *               description: Refers to the tenantId.
 *             appCode:
 *               type: string
 *               example: appCode
 *               description: Refers to the appCode.
 *             serviceCode:
 *               type: string
 *               example: serviceCode
 *               description: Refers to the serviceCode.
 *             correlationId:
 *               type: string
 *               example: correlationId
 *               description: Refers to the correlationId.
 *             storageType:
 *               type: string
 *               example: SQL
 *               description: Refers to the storageType and must be [SQL, Blob, NoSQL].
 *             resourceName:
 *               type: string
 *               example: resourceName
 *               description: Refers to the resourceName.
 *             credential:
 *               type: string
 *               example: credential
 *               description: Refers to the credential.
 *     responses:
 *       201:
 *         description: Successfully get
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 5dce4cd1c1e1e517dc3591b9
 *             metadata:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Success
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: "#/definitions/400 - Bad Request"
 *       422:
 *         description: Unprocessable entity.Validation Error. Any of the fields sent are invalid.
 *         schema:
 *            $ref: "#/definitions/422 - UnProcessable"
 */
//#endregion
router.route("/").post(checkSchema(validations.create as any), schemaErrorHandler, controllerAdapter(catalogControllerInstance, "create"));

router.route("/:id").put(checkSchema(validations.update as any), schemaErrorHandler, controllerAdapter(catalogControllerInstance, "update"));

//#region [swagger: /catalogs/resourceNames]
/**
 * @swagger
 * /catalogs/resourceNames:
 *   get:
 *     tags:
 *       - Catalogs
 *     description: Get resourceName and credential for all tenants.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: appCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Refers to the appCode.
 *       - in: query
 *         name: serviceCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Refers to the serviceCode.
 *       - in: query
 *         name: storageType
 *         required: true
 *         schema:
 *           type: string
 *         description: Refers to the storageType and must be [SQL, Blob, NoSQL].
 *     responses:
 *       200:
 *         description: Successfully get
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   resourceName:
 *                     type: string
 *                   credential:
 *                     type: string
 *             metadata:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 timestamp:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: "#/definitions/400 - Bad Request"
 *       422:
 *         description: Unprocessable entity.Validation Error. Any of the fields sent are invalid.
 *         schema:
 *            $ref: "#/definitions/422 - UnProcessable"
 */
//#endregion
router
  .route("/resourceNames")
  .get(checkSchema(validations.getResourceNames as any), schemaErrorHandler, controllerAdapter(catalogControllerInstance, "getResourceNames"));

//#region [swagger: others]
/**
 * @swagger
 * definitions:
 *   400 - Bad Request:
 *     properties:
 *       data:
 *          type: string
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 400
 *            message:
 *              type: string
 *              example: Bad Request
 *            timestamp:
 *              type: string
 */

/**
 * @swagger
 * definitions:
 *   422 - UnProcessable:
 *     properties:
 *       data:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              location:
 *                type: string
 *              param:
 *                type: string
 *              value:
 *                type: string
 *              msg:
 *                type: string
 *       metadata:
 *          properties:
 *            code:
 *              type: number
 *              example: 422
 *            message:
 *              type: string
 *              example: Validation Error
 *            timestamp:
 *              type: string
 */
//#endregion

export default router;
