export async function onRequest(context) {
  const { request } = context;
  const USER = "buudien";
  const PASS = "MatKhau2026";

  const authHeader = request.headers.get("Authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      const user = decoded.substring(0, sep);
      const pass = decoded.substring(sep + 1);
      if (user === USER && pass === PASS) {
        return context.next();
      }
    }
  }
  return new Response("Yêu cầu đăng nhập để xem báo cáo", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Bao cao khach hang"' }
  });
}
