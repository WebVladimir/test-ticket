export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

export function camelToKebab(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function reachGoal(name) {
    if (window.ym) {
        window.ym(null, 'reachGoal', name);
    }
}

export function getStaticUrl(path, isCssUrl = false) {
    const staticUrl = `${window.STATIC_PATH}/${path}`;
    return isCssUrl ? `url(${staticUrl})` : staticUrl;
}
