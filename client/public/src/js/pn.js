const publicVapidKey = 'BLzUn38rcyNg1V0joN3I-kKmB4JWJWwUxn6WtiFRHWiA_O8O42Elo_KnT0lhn-yQE-MNz5NCeKMVS_bgMYvxGRo';
const PN = (function () {
    function init() {
        requestPermissions();

        initHtml(); // TODO: remove this
    }

    // TODO: remove this
    async function initHtml() {
        const getAll = document.getElementById('getAll');
        const removeAll = document.getElementById('removeAll');
        const list = document.getElementById('list');

        getAll.onclick = async function () {
            const response = await fetch('http://localhost:4000/list', {
                method: 'GET',
                headers: {'content-type': 'application/json'}
            });
            if (response.ok) {
                const data = await response.json();
                list.innerHTML = JSON.stringify(data)
            }
        };
        removeAll.onclick = async function () {
            await fetch('http://localhost:4000/removeAll', {
                method: 'DELETE',
                headers: {'content-type': 'application/json'}
            });
        };
    }

    function requestPermissions() {
        if (isDefaultPermission()) {
            Notification.requestPermission().then(status => {
                ('granted' === status) && saveSubscription();
            });
        } else if (isGrantedPermission) {
            saveSubscription();
        }
    }

    async function saveSubscription() {
        const registration = await navigator.serviceWorker.register('/sw.js', {scope: '/'});
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        await fetch('http://localhost:4000/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {'content-type': 'application/json'}
        });
    }

    function isDefaultPermission() {
        return 'default' === Notification.permission;
    }

    function isGrantedPermission() {
        return 'granted' === Notification.permission;
    }
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }

    return {init};
})();
document.addEventListener('DOMContentLoaded', () => {
    'serviceWorker' in navigator && PN.init();
});