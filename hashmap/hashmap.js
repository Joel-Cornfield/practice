class HashMap {
    constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.buckets = new Array(initialCapacity).fill(null).map(() => []);
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);
        if (index < 0 || index > this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        for (const entry of bucket) {
            if (entry.key === key) {
                entry.value = value;
                return;
            }
        }
        bucket.push({ key, value })
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.hash(key);
        if (index < 0 || index > this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        for (const entry of bucket) {
            if (entry.key === key) {
                return entry.value;
            }
        }
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
       this.buckets = new Array(this.capacity).fill(null).map(() => []);
       this.size = 0; 
    }

    keys() {
        return this.buckets.flatMap(bucket => bucket.map(entry => entry.key));
    }

    values() {
        return this.buckets.flatMap(bucket => bucket.map(entry => entry.value));
    }

    entries() {
        return this.buckets.flatMap(bucket => bucket.map(entry => [entry.key, entry.value]));
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
    
        for (const bucket of oldBuckets) {
            for (const entry of bucket) {
                this.set(entry.key, entry.value);
            }
        }
    }
}

// Example usage
const map = new HashMap();
map.set("Carlos", "I am the old value.");
map.set("Carlos", "I am the new value.");
map.set("Carla", "Different key.");
console.log(map.get("Carlos")); // "I am the new value."
console.log(map.get("Carla"));  // "Different key."
console.log(map.keys());        // ["Carlos", "Carla"]
console.log(map.values());      // ["I am the new value.", "Different key."]
console.log(map.entries());     // [["Carlos", "I am the new value."], ["Carla", "Different key."]] 