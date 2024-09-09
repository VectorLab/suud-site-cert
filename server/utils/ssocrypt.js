import crypto from "crypto";

const symDecrypt = async (key, iv, data) => {
  try {
    const impKey = await crypto.subtle.importKey(
      "raw",
      key,
      "AES-GCM",
      true,
      ["encrypt", "decrypt"]
    );
    const decData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      impKey,
      data
    );
    return Buffer.from(decData);
  } catch (error) {
    console.log("Symmetric decryption error:", error);
  }
};

export const ssoDecrypt = async (encData) => {
  try {
    const decHeader = await asymPrivDecrypt(encData.header);
    const key = decHeader.subarray(0, 32);
    const iv = decHeader.subarray(32, 44);
    return await symDecrypt(key, iv, encData.body);
  } catch (error) {
    console.log("SSO decryption error:", error);
  }
};

const asymPrivDecrypt = async (encData) => {
  try {
    const decData = await crypto.subtle.decrypt({
      name: "RSA-OAEP"
    }, ssoID.pri, encData);
    return Buffer.from(decData);
  } catch (error) {
    console.log("Asymmetric decryption error:", error);
  }
};

let ssoID = {
  pri: undefined,
  pwd: undefined,
  _id: undefined,
};

const onLoad = async () => {
  try {
    const priKey = process.env.SSO_PRIVATE_KEY;
    const pwd = process.env.SSO_PASSWORD;
    const siteID = process.env.SSO_SITE_ID;

    if (!priKey || !pwd || !siteID) {
      throw new error("Missing required environment variables");
    }

    ssoID.pwd = Buffer.from(pwd, "base64url");
    ssoID.pri = await crypto.subtle.importKey("pkcs8",
      Buffer.from(priKey, "base64url"), {
      name: "RSA-OAEP",
      hash: "SHA-256"
    }, true, ["decrypt"]);
    ssoID._id = Buffer.from(siteID, "hex");
  } catch (error) {
    console.log("Key loading error:", error);
  }
};

let loaded = false;

export const checkLoad = async () => {
  if (loaded) {
    return;
  }
  try {
    await onLoad();
    loaded = true;
  } catch (error) {
    console.log("Load check error:", error);
  }
};