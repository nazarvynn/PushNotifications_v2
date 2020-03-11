function receivePushNotification(event) {
    if (event && event.data) {
        const {title, icon, image, body, url} = event.data.json();
        const options = {icon, image, body, data: url, requireInteraction: true};
        event.waitUntil(self.registration.showNotification(title, options));
    }
}

function openPushNotification(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);