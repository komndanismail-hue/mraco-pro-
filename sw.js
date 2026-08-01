// مراكو برو — Service Worker للإشعارات
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data.json(); } catch (err) {}
  e.waitUntil(
    self.registration.showNotification(d.title || "🔔 مراكو برو", {
      body: d.body || "وصلك طلب جديد — افتح التطبيق للرد",
      icon: "icon-192.png",
      badge: "icon-192.png",
      vibrate: [300, 100, 300, 100, 500],
      tag: "mraco-order",
      renotify: true,
      data: { url: d.url || "./" }
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((ws) => {
      for (const w of ws) { if ("focus" in w) return w.focus(); }
      return clients.openWindow(e.notification.data && e.notification.data.url ? e.notification.data.url : "./");
    })
  );
});
