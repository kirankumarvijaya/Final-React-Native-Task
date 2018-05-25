import productWatchers from "./product";

export default function* rootWatchers() {
    yield [productWatchers()]
}