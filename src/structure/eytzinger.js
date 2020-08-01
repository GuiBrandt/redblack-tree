// http://opendatastructures.org/versions/edition-0.1d/ods-java/node52.html
// Geralmente usa pra Heap, mas quis ser hipster aqui
const EytzingerTreeStructure = (n = 1) => {
    const Node = (i) => i

    const data = Array.from({
        length: n
    }, () => null);

    const root = () => Node(0 | 0);

    const parent = node => Node((node - 1) >> 1);
    const left = node => Node((node << 1) + 1);
    const right = node => Node((node << 1) + 2);

    const get = node => data[node].value;
    const set = (node, value) => {
        data[node] = {
            value
        };
        return node;
    }

    const empty = (node) => !data[node];

    const rotateLeft = (node) => node; // TODO
    const rotateRight = (node) => node; // TODO
    const popMin = (node) => null; // TODO
    const popMax = (node) => null; // TODO

    return {
        root,
        parent,
        left,
        right,
        get,
        set,
        empty,
        rotateLeft,
        rotateRight,
        popMin,
        popMax
    };
};

module.exports = EytzingerTreeStructure;
