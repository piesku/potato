export function integer(min = 0, max = 1) {
    return ~~(Math.random() * (max - min + 1) + min);
}

export function float(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
}

export function element<T>(arr: Array<T>) {
    return arr[integer(0, arr.length - 1)];
}
