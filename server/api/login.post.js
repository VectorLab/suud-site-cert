export default defineEventHandler(async (event) => {
  await checkLoad();

  const reqBody = await readBody(event);
  let decrypted;

  try {
    const header = Buffer.from(reqBody.h, "base64url");
    const body = Buffer.from(reqBody.b, "base64url");
    decrypted = JSON.parse(await ssoDecrypt({ header, body }));
  } catch (error) {
    console.log(error);
    return sendNoContent(event, 400);
  }

  if (!decrypted) return sendNoContent(event, 400);
  if (!Number.isSafeInteger(decrypted.t) || Date.now() > decrypted.t + 60000) return sendNoContent(event, 400);

  const userData = { username: undefined, avatar: undefined };

  decrypted.p.forEach(prop => {
    if (prop.p === 3) userData.avatar = prop.r;
    if (prop.p === 2) userData.username = prop.r;
  });

  return userData;
});