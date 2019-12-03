import { HttpRequestLocation } from "../../libs";
import { commonValidations } from "../commonValidations";

const validations = Object.freeze({
  appCode(locationType = HttpRequestLocation.query) {
    return commonValidations.checkString("appCode", locationType);
  },
  correlationId: commonValidations.checkString("correlationId", HttpRequestLocation.body),
  credential: commonValidations.checkString("credential", HttpRequestLocation.body),
  credentialExpiryTime: commonValidations.checkDate("credentialExpiryTime", HttpRequestLocation.body),
  resourceName: commonValidations.checkString("resourceName", HttpRequestLocation.body),
  serviceCode(locationType = HttpRequestLocation.query, isRequired = true) {
    return commonValidations.checkString("serviceCode", locationType, isRequired);
  },
  tenantId(locationType = HttpRequestLocation.query, isRequired = true) {
    return commonValidations.checkString("tenantId", locationType, isRequired);
  }
});

export default Object.freeze({
  list: {
    appCode: validations.appCode(HttpRequestLocation.query),
    serviceCode: validations.serviceCode(HttpRequestLocation.body, false),
    tenantId: validations.tenantId(HttpRequestLocation.query, false)
  },
  create: {
    appCode: validations.appCode(HttpRequestLocation.body),
    correlationId: validations.correlationId,
    credential: validations.credential,
    credentialExpiryTime: validations.credentialExpiryTime,
    resourceName: validations.resourceName,
    serviceCode: validations.serviceCode(HttpRequestLocation.body),
    tenantId: validations.tenantId(HttpRequestLocation.body)
  },
  update: {
    id: commonValidations.checkObjectId("id", HttpRequestLocation.query),
    credential: validations.credential,
    credentialExpiryTime: validations.credentialExpiryTime,
    resourceName: validations.resourceName
  },
  getResourceNames: {
    appCode: validations.appCode(HttpRequestLocation.query),
    serviceCode: validations.serviceCode(HttpRequestLocation.query)
  }
});
